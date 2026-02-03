// server/src/middleware/performance.js
const logger = require('../utils/logger');

// Request timing middleware
const requestTiming = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        // Log slow requests (> 1 second)
        if (duration > 1000) {
            logger.warn(`Slow request: ${req.method} ${req.path} took ${duration}ms`);
        }

        // Add timing header
        res.setHeader('X-Response-Time', `${duration}ms`);
    });

    next();
};

// Memory monitoring
const memoryMonitoring = (req, res, next) => {
    const usage = process.memoryUsage();

    // Warn if memory usage is high
    if (usage.heapUsed > 500 * 1024 * 1024) { // 500MB
        logger.warn(`High memory usage: ${Math.round(usage.heapUsed / 1024 / 1024)}MB`);
    }

    next();
};

module.exports = {
    requestTiming,
    memoryMonitoring,
};
