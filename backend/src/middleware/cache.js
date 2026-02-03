// server/src/middleware/cache.js
const redis = require('../config/redis');
const logger = require('../utils/logger');

/**
 * Cache middleware with advanced features
 * @param {number} duration - Cache duration in seconds
 * @param {function} keyGenerator - Custom cache key generator
 */
const cache = (duration = 300, keyGenerator = null) => {
    return async (req, res, next) => {
        // Generate cache key
        const key = keyGenerator
            ? keyGenerator(req)
            : `cache:${req.method}:${req.originalUrl}`;

        try {
            // Try to get cached response
            const cached = await redis.get(key);

            if (cached) {
                logger.info(`Cache hit: ${key}`);

                // Add cache header
                res.setHeader('X-Cache', 'HIT');

                return res.json(JSON.parse(cached));
            }

            logger.info(`Cache miss: ${key}`);
            res.setHeader('X-Cache', 'MISS');

            // Store original send function
            const originalSend = res.json.bind(res);

            // Override send to cache response
            res.json = function (body) {
                // Only cache successful responses
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    redis.setex(key, duration, JSON.stringify(body))
                        .catch(err => logger.error('Cache set error:', err));
                }

                return originalSend(body);
            };

            next();
        } catch (error) {
            logger.error('Cache error:', error);
            next();
        }
    };
};

/**
 * Invalidate cache by pattern
 */
const invalidateCache = async (pattern) => {
    try {
        const keys = await redis.keys(pattern);

        if (keys.length > 0) {
            // redis.del(...keys) requires spreading, check if too many keys
            // using ioredis, del accepts varargs
            await redis.del(...keys);
            logger.info(`Cache invalidated: ${keys.length} keys deleted for pattern ${pattern}`);
        }
    } catch (error) {
        logger.error('Cache invalidation error:', error);
    }
};

/**
 * Cache user-specific data
 */
const cacheUser = (duration = 300) => {
    return cache(duration, (req) => {
        return `cache:user:${req.userId}:${req.method}:${req.path}`;
    });
};

/**
 * Cache with tags for easy invalidation
 */
class CacheManager {
    static async set(key, value, ttl = 300, tags = []) {
        try {
            // Set main cache
            await redis.setex(key, ttl, JSON.stringify(value));

            // Add to tag sets
            for (const tag of tags) {
                await redis.sadd(`tag:${tag}`, key);
                await redis.expire(`tag:${tag}`, ttl + 60); // Slightly longer TTL
            }
        } catch (error) {
            logger.error('Cache set error:', error);
        }
    }

    static async get(key) {
        try {
            const cached = await redis.get(key);
            return cached ? JSON.parse(cached) : null;
        } catch (error) {
            logger.error('Cache get error:', error);
            return null;
        }
    }

    static async invalidateByTag(tag) {
        try {
            const keys = await redis.smembers(`tag:${tag}`);

            if (keys.length > 0) {
                await redis.del(...keys);
                await redis.del(`tag:${tag}`);
                logger.info(`Cache invalidated by tag: ${tag} (${keys.length} keys)`);
            }
        } catch (error) {
            logger.error('Cache invalidation error:', error);
        }
    }
}

module.exports = {
    cache,
    cacheUser,
    invalidateCache,
    CacheManager,
};
