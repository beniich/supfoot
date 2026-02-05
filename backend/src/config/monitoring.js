const Sentry = require('@sentry/node');
const client = require('prom-client');
const logger = require('../utils/logger');

// 1. Configuration Prometheus (Métriques)
// Collecter les métriques par défaut (CPU, RAM, Event Loop)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ prefix: 'footballhub_' });

// Métriques personnalisées
const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 500, 1000, 3000, 5000] // Buckets for response time
});

const activeConnections = new client.Gauge({
    name: 'active_connections',
    help: 'Number of active connections'
});

// 2. Configuration Sentry (Erreurs)
const initSentry = (app) => {
    if (process.env.SENTRY_DSN) {
        Sentry.init({
            dsn: process.env.SENTRY_DSN,
            environment: process.env.NODE_ENV || 'development',
            tracesSampleRate: 1.0, // Capture 100% des transactions pour le debug (réduire en prod)
            integrations: [
                // enable HTTP calls tracing
                new Sentry.Integrations.Http({ tracing: true }),
                // enable Express.js tracing
                new Sentry.Integrations.Express({ app }),
            ],
        });
        logger.info('✅ Sentry initialized');
    } else {
        logger.warn('⚠️ Sentry DSN not found. Error tracking disabled.');
    }
};

const setupSentryErrorHandling = (app) => {
    if (process.env.SENTRY_DSN) {
        app.use(Sentry.Handlers.errorHandler());
    }
};

module.exports = {
    Sentry,
    initSentry,
    setupSentryErrorHandling,
    client, // Prometheus registry
    httpRequestDurationMicroseconds,
    activeConnections
};
