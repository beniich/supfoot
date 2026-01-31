const Sentry = require('@sentry/node');

const initSentry = (app) => {
    if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
        Sentry.init({
            dsn: process.env.SENTRY_DSN,
            environment: process.env.NODE_ENV,
            tracesSampleRate: 0.1,
        });

        console.log('✅ Sentry monitoring initialized');
    }
};

// Sentry v8+ handles errors via Sentry.setupExpressErrorHandler(app)
// which should be called after all routes.
const setupSentryErrorHandling = (app) => {
    if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
        Sentry.setupExpressErrorHandler(app);
        console.log('✅ Sentry error handling initialized');
    }
};

module.exports = { initSentry, setupSentryErrorHandling };
