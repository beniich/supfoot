// backend/ecosystem.config.js
module.exports = {
    apps: [
        {
            name: 'footballhub-api',
            script: './src/index.js',
            instances: 'max', // Use all CPU cores
            exec_mode: 'cluster',

            // Environment
            env_production: {
                NODE_ENV: 'production',
                PORT: 5000,
            },

            // Restart strategies
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            max_restarts: 10,
            min_uptime: '10s',

            // Logging
            error_file: './logs/pm2-error.log',
            out_file: './logs/pm2-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            merge_logs: true,

            // Graceful shutdown
            kill_timeout: 5000,
            wait_ready: true,
            listen_timeout: 10000,
            shutdown_with_message: true,
        },
    ],
};
