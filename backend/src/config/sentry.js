// server/src/config/sentry.js
const Sentry = require('@sentry/node');
const { ProfilingIntegration } = require('@sentry/profiling-node');

const initSentry = (app) => {
    if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
        Sentry.init({
            dsn: process.env.SENTRY_DSN,
            environment: process.env.NODE_ENV,

            // Performance Monitoring
            integrations: [
                new Sentry.Integrations.Http({ tracing: true }),
                new Sentry.Integrations.Express({ app }),
                new Sentry.Integrations.Mongo(),
                new ProfilingIntegration(),
            ],

            // Traces (Performance)
            tracesSampleRate: 0.1, // 10% of transactions

            // Profiling (CPU & Memory)
            profilesSampleRate: 0.1,

            // Custom tags
            beforeSend(event) {
                // Remove sensitive data
                if (event.request?.data) {
                    delete event.request.data.password;
                    delete event.request.data.token;
                }

                // Filter out health checks
                if (event.request?.url?.includes('/health')) {
                    return null;
                }

                return event;
            },

            // Performance monitoring
            beforeSendTransaction(transaction) {
                // Filter out health checks and static files
                if (transaction.name?.includes('GET /health') ||
                    transaction.name?.includes('GET /static')) {
                    return null;
                }

                return transaction;
            },
        });

        // Request handler (must be first middleware)
        app.use(Sentry.Handlers.requestHandler());

        // Tracing handler
        app.use(Sentry.Handlers.tracingHandler());

        console.log('✅ Sentry APM initialized');
    } else {
        console.log('ℹ️ Sentry skipped (Development or missing DSN)');
    }
};

// Custom transaction tracking
const trackTransaction = (name, operation) => {
    return Sentry.startTransaction({
        name,
        op: operation,
    });
};

// Track database queries
const trackDatabaseQuery = (query) => {
    const transaction = Sentry.getCurrentHub().getScope().getTransaction();

    if (transaction) {
        const span = transaction.startChild({
            op: 'db.query',
            description: query,
        });

        return span;
    }
};

// Setup Sentry error handling
const setupSentryErrorHandling = (app) => {
    if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
        app.use(Sentry.Handlers.errorHandler());
    }
};

module.exports = {
    initSentry,
    trackTransaction,
    trackDatabaseQuery,
    setupSentryErrorHandling
};
