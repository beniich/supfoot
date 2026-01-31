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
const { initSentry, setupSentryErrorHandling } = require('./config/sentry');

const app = express();

// Initialize Sentry (FIRST!)
initSentry(app);

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
  })
  .catch((err) => {
    logger.error('❌ MongoDB connection error:', err);
    // process.exit(1); // Don't crash in dev if mongo is missing
  });

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

// ============================================================================
// 11. HEALTH CHECK
// ============================================================================
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
  });
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

if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT} (SECURED)`);
    logger.info(`📡 API available at http://localhost:${PORT}/api`);
  });
}

module.exports = app;