// src/index.js - VERSION SÉCURISÉE
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const morgan = require('morgan');
const logger = require('./utils/logger'); // Winston logger
const logger = require('./utils/logger'); // Winston logger
const { initSentry, setupSentryErrorHandling, client, httpRequestDurationMicroseconds } = require('./config/monitoring');

const app = express();

// Initialize Sentry (FIRST!)
initSentry(app);

// Prometheus middleware to collect request duration
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDurationMicroseconds
      .labels(req.method, req.route ? req.route.path : req.path, res.statusCode)
      .observe(duration);
  });
  next();
});

// Prometheus Metrics Route
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// ============================================================================
// 1. TRUST PROXY (pour rate limiting derrière reverse proxy)
// ============================================================================
app.set('trust proxy', 1);

// ============================================================================
// 2. HELMET - Protection Headers HTTP
// ============================================================================
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "http://localhost:3000", "http://localhost:5000", "ws://localhost:5000"], // Ajout pour WebSocket
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  frameguard: { action: 'deny' },
  noSniff: true,
  xssFilter: true,
}));

// ============================================================================
// 3. CORS - Configuration Stricte
// ============================================================================
const whitelist = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://192.168.1.6:3000', // Mobile local dev
  'https://footballhub.ma',
  'https://www.footballhub.ma',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (like Postman or server-to-server) which have no origin
    if (!origin || whitelist.indexOf(origin) !== -1 || origin.startsWith('http://192.168.')) {
      callback(null, true);
    } else {
      logger.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));

// ============================================================================
// 4. RATE LIMITING - Protection Force Brute & DDoS
// ============================================================================

// Global rate limit
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // A bit higher for dev/SPA
  message: {
    success: false,
    message: 'Too many requests, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Too many requests, please try again later',
    });
  },
});

// Strict rate limit for authentication
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // Max 10 login attempts per 15min
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 15 minutes',
  },
});

// Apply limiters (only in production or if needed)
if (process.env.NODE_ENV === 'production') {
  app.use('/api/', globalLimiter);
  app.use('/api/auth/login', authLimiter);
  app.use('/api/auth/register', authLimiter);
} else {
  // In dev, more lenient
  app.use('/api/auth/login', authLimiter);
}

// ============================================================================
// 5. DATA SANITIZATION
// ============================================================================

// NoSQL Injection Protection
app.use(mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    logger.warn(`NoSQL injection attempt detected: ${key} from ${req.ip}`);
  },
}));

// XSS Protection
app.use(xss());

// HTTP Parameter Pollution Protection
app.use(hpp({
  whitelist: ['sort', 'fields', 'page', 'limit'], // Allow these params multiple times
}));

// ============================================================================
// 6. BODY PARSER avec Limites
// ============================================================================
app.use(express.json({
  limit: '10mb',
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      logger.error('Invalid JSON received');
      throw new Error('Invalid JSON');
    }
  },
}));

app.use(express.urlencoded({
  extended: true,
  limit: '10mb',
  parameterLimit: 1000,
}));

// ============================================================================
// 7. COMPRESSION
// ============================================================================
app.use(compression());

// ============================================================================
// 8. LOGGING SÉCURISÉ
// ============================================================================
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
  skip: (req) => req.url === '/api/health', // Skip health checks
}));

// ============================================================================
// 9. MONGODB CONNECTION
// ============================================================================
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  maxPoolSize: 10,
};

// Check if MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
  logger.warn('MONGODB_URI not defined, using local fallback');
}

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/footballhub', mongoOptions)
  .then(() => {
    logger.info('✅ MongoDB connected successfully');

    // Initialize CRON jobs after successful DB connection
    initializeCronJobs();
  })
  .catch((err) => {
    logger.error('❌ MongoDB connection error:', err);
    // process.exit(1); // Don't crash in dev if mongo is missing
  });

// ============================================================================
// 9.5. CRON JOBS - Automatic Data Synchronization
// ============================================================================
const cron = require('node-cron');
const footballApi = require('./services/footballApi');
const uefaScraper = require('./services/uefaScraper');
const newsSyncJob = require('./jobs/newsSyncJob');
const newsletterJob = require('./jobs/newsletterJob');

function initializeCronJobs() {
  logger.info('⏰ Initializing CRON jobs...');

  // Start news sync
  newsSyncJob.start();
  newsletterJob.start();

  // Sync leagues every day at 3 AM
  cron.schedule('0 3 * * *', async () => {
    logger.info('🔄 CRON: Starting daily leagues sync...');
    try {
      await footballApi.syncLeagues();
      logger.info('✅ CRON: Leagues sync completed');
    } catch (error) {
      logger.error('❌ CRON: Leagues sync failed:', error);
    }
  });

  // Sync live matches every 2 minutes
  cron.schedule('*/2 * * * *', async () => {
    logger.info('🔄 CRON: Fetching live matches...');
    try {
      const liveMatches = await footballApi.getLiveMatches();
      logger.info(`✅ CRON: Found ${liveMatches.length} live matches`);
    } catch (error) {
      logger.error('❌ CRON: Live matches fetch failed:', error);
    }
  });

  // Sync fixtures for major leagues every 6 hours
  cron.schedule('0 */6 * * *', async () => {
    logger.info('🔄 CRON: Starting fixtures sync...');
    try {
      const currentYear = new Date().getFullYear();
      const leagues = [39, 140, 78, 135, 61, 2, 200]; // Premier, La Liga, Bundesliga, Serie A, Ligue 1, UCL, Botola

      for (const leagueId of leagues) {
        await footballApi.syncFixturesByLeague(leagueId, currentYear);
        await new Promise(resolve => setTimeout(resolve, 7000)); // Rate limiting
      }

      logger.info('✅ CRON: Fixtures sync completed');
    } catch (error) {
      logger.error('❌ CRON: Fixtures sync failed:', error);
    }
  });

  // Sync standings every 12 hours
  cron.schedule('0 */12 * * *', async () => {
    logger.info('🔄 CRON: Starting standings sync...');
    try {
      const currentYear = new Date().getFullYear();
      const leagues = [39, 140, 78, 135, 61, 200];

      for (const leagueId of leagues) {
        await footballApi.syncStandingsByLeague(leagueId, currentYear);
        await new Promise(resolve => setTimeout(resolve, 7000));
      }

      logger.info('✅ CRON: Standings sync completed');
    } catch (error) {
      logger.error('❌ CRON: Standings sync failed:', error);
    }
  });

  // Sync Champions League from UEFA every 4 hours
  cron.schedule('0 */4 * * *', async () => {
    logger.info('🔄 CRON: Starting UEFA Champions League sync...');
    try {
      await uefaScraper.scrapeChampionsLeague();
      logger.info('✅ CRON: UEFA sync completed');
    } catch (error) {
      logger.error('❌ CRON: UEFA sync failed:', error);
    }
  });

  logger.info('✅ CRON jobs initialized successfully');
}

// ============================================================================
// 10. ROUTES
// ============================================================================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/members', require('./routes/members'));
app.use('/api/events', require('./routes/events'));
app.use('/api/tickets', require('./routes/tickets'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/leagues', require('./routes/leagues'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/news', require('./routes/news'));
app.use('/api/standings', require('./routes/standings'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin/news', require('./routes/admin/news'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/payments', require('./routes/stripe-webhooks')); // Advanced Webhooks (precedence over payments.js webhook)
app.use('/api/payments', require('./routes/payments'));
app.use('/api/associations', require('./routes/associationRoutes'));
app.use('/api/ai', require('./routes/ai')); // AI Agent routes
app.use('/api/bookmarks', require('./routes/bookmarks'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/youtube', require('./routes/youtube'));

// ============================================================================
// 11. HEALTH CHECK
// ============================================================================
const League = require('./models/League');
const Team = require('./models/Team');
const Match = require('./models/Match');
const Product = require('./models/Product');

app.get('/api/health', async (req, res) => {
  try {
    const counts = {
      leagues: await League.countDocuments(),
      teams: await Team.countDocuments(),
      matches: await Match.countDocuments(),
      products: await Product.countDocuments(),
    };

    res.status(200).json({
      status: 'OK',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      data: counts
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: error.message
    });
  }
});

// ============================================================================
// 12. ERROR HANDLING
// ============================================================================

// Sentry error handler (BEFORE other error handlers)
setupSentryErrorHandling(app);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  const isDevelopment = process.env.NODE_ENV === 'development';

  res.status(err.status || 500).json({
    success: false,
    message: isDevelopment ? err.message : 'Internal server error',
    ...(isDevelopment && { stack: err.stack }),
  });
});

// ============================================================================
// 13. START SERVER
// ============================================================================
const PORT = process.env.PORT || 5000;
const WebSocketService = require('./services/websocketService');

if (require.main === module) {
  const server = app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT} (SECURED)`);
    logger.info(`📡 API available at http://localhost:${PORT}/api`);
  });

  // Initialize WebSockets
  try {
    const wsService = new WebSocketService(server);
    logger.info('🔌 WebSocket Server initialized');
  } catch (error) {
    logger.error('Failed to init WebSocket:', error);
  }
}

module.exports = app;