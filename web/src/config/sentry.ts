import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export const initSentry = () => {
    // Check for production environment and DSN availability
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
        Sentry.init({
            dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
            environment: process.env.NODE_ENV,

            integrations: [
                new BrowserTracing(),
                new Sentry.Replay({
                    maskAllText: false,
                    blockAllMedia: false,
                }),
            ],

            // Performance Monitoring
            tracesSampleRate: 0.1,

            // Session Replay
            replaysSessionSampleRate: 0.1,
            replaysOnErrorSampleRate: 1.0,

            beforeSend(event) {
                // Don't send in development
                if (process.env.NODE_ENV !== 'production') {
                    return null;
                }
                return event;
            },
        });

        console.log('✅ Sentry initialized');
    }
};
