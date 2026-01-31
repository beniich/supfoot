// ============================================
// Application Configuration
// ============================================

export const APP_CONFIG = {
    // Application Info
    name: process.env.NEXT_PUBLIC_APP_NAME || 'FootballHub+',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    version: '1.0.0',

    // API Configuration
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
        timeout: 10000, // 10 seconds
        retryAttempts: 3,
    },

    // WebSocket Configuration
    websocket: {
        url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:5000',
        reconnectInterval: 5000, // 5 seconds
        maxReconnectAttempts: 5,
    },

    // Football API Configuration
    footballApi: {
        key: process.env.NEXT_PUBLIC_FOOTBALL_API_KEY || '',
        url: process.env.NEXT_PUBLIC_FOOTBALL_API_URL || 'https://v3.football.api-sports.io',
    },

    // Payment Configuration
    payment: {
        stripe: {
            publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
        },
        paypal: {
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
        },
    },

    // Analytics
    analytics: {
        googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    },

    // Push Notifications
    notifications: {
        fcmVapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY || '',
    },

    // Feature Flags
    features: {
        enableLiveChat: true,
        enableFantasyLeague: true,
        enableAIPredictions: true,
        enableQRScanner: true,
        enableShop: true,
        enableTickets: true,
        enableReferralProgram: true,
        enableLoyaltyProgram: true,
    },

    // UI Configuration
    ui: {
        itemsPerPage: 20,
        maxSearchResults: 50,
        debounceDelay: 300, // milliseconds
        toastDuration: 3000, // milliseconds
    },

    // Cache Configuration
    cache: {
        matchesTTL: 60000, // 1 minute
        leaguesTTL: 3600000, // 1 hour
        productsTTL: 600000, // 10 minutes
    },

    // File Upload
    upload: {
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB
        allowedTypes: (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp').split(','),
    },

    // Membership Tiers
    membership: {
        tiers: {
            standard: {
                name: 'Standard',
                price: 0,
                features: ['Basic match updates', 'Community access', 'News articles'],
            },
            pro: {
                name: 'Pro',
                price: 99,
                features: [
                    'Live match streaming',
                    'Advanced statistics',
                    'Fantasy league',
                    'Priority support',
                    'Ad-free experience',
                ],
            },
            elite: {
                name: 'Elite',
                price: 199,
                features: [
                    'All Pro features',
                    'AI predictions',
                    'Exclusive content',
                    'VIP events access',
                    'Personal concierge',
                    'Partner discounts',
                ],
            },
        },
    },

    // Social Links
    social: {
        twitter: 'https://twitter.com/footballhubplus',
        facebook: 'https://facebook.com/footballhubplus',
        instagram: 'https://instagram.com/footballhubplus',
        youtube: 'https://youtube.com/footballhubplus',
    },

    // Contact
    contact: {
        email: 'support@footballhub.com',
        phone: '+212 5XX-XXXXXX',
    },

    // Legal
    legal: {
        termsUrl: '/legal/terms',
        privacyUrl: '/legal/privacy',
        cookiesUrl: '/legal/cookies',
    },
} as const;

// Helper function to check if a feature is enabled
export const isFeatureEnabled = (feature: keyof typeof APP_CONFIG.features): boolean => {
    return APP_CONFIG.features[feature];
};

// Helper function to get membership tier info
export const getMembershipTier = (tier: 'standard' | 'pro' | 'elite') => {
    return APP_CONFIG.membership.tiers[tier];
};

// Export individual configs for convenience
export const { api, websocket, footballApi, payment, features, ui, cache } = APP_CONFIG;

export default APP_CONFIG;
