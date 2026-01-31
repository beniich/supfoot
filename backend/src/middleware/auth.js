// src/middleware/auth.js - VERSION SÉCURISÉE
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

// Token blacklist (Note: In production, rely on Redis or database for persistence)
const tokenBlacklist = new Set();
// Clean blacklist periodically
setInterval(() => {
  // Only simple implementation for MVP, in prod use proper expiration store
  if (tokenBlacklist.size > 1000) tokenBlacklist.clear();
}, 3600000); // 1h

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      // Don't log missing tokens as warnings to avoid spam from public scrapes
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    // Check blacklist
    if (tokenBlacklist.has(token)) {
      logger.warn(`Auth failed: Blacklisted token from ${req.ip}`);
      return res.status(401).json({
        success: false,
        message: 'Token revoked',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      logger.warn(`Auth failed: User not found ${decoded.id} from ${req.ip}`);
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    if (!user.isActive) {
      logger.warn(`Auth failed: Inactive user ${user._id} from ${req.ip}`);
      return res.status(403).json({
        success: false,
        message: 'Account disabled',
      });
    }

    // Check if password changed after token issued
    if (user.passwordChangedAt) {
      const changedTimestamp = Math.floor(user.passwordChangedAt.getTime() / 1000);
      if (decoded.iat < changedTimestamp) {
        logger.warn(`Auth failed: Password changed after token issued for ${user._id}`);
        return res.status(401).json({
          success: false,
          message: 'Password changed, please login again',
        });
      }
    }

    req.user = user;
    req.userId = user._id;
    req.token = token;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      logger.warn(`Auth failed: Token expired from ${req.ip}`);
      return res.status(401).json({
        success: false,
        message: 'Token expired',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      logger.warn(`Auth failed: Invalid token from ${req.ip}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    logger.error('Auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication error',
    });
  }
};

// Logout (blacklist token)
const logout = (req, res) => {
  const token = req.token;
  if (token) {
    tokenBlacklist.add(token);

    // Auto-remove from blacklist after expiration
    const decoded = jwt.decode(token);
    if (decoded && decoded.exp) {
      const expiresIn = (decoded.exp * 1000) - Date.now();
      if (expiresIn > 0) {
        setTimeout(() => {
          tokenBlacklist.delete(token);
        }, expiresIn);
      }
    }
  }

  res.json({ success: true, message: 'Logged out' });
};

const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  if (req.user.role !== 'admin') {
    logger.warn(`Authorization failed: User ${req.user._id} tried to access admin route`);
    return res.status(403).json({
      success: false,
      message: 'Admin access required',
    });
  }

  next();
};

const requireStaff = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  if (!['admin', 'staff'].includes(req.user.role)) {
    logger.warn(`Authorization failed: User ${req.user._id} tried to access staff route`);
    return res.status(403).json({
      success: false,
      message: 'Staff access required',
    });
  }

  next();
};

module.exports = {
  authenticateToken,
  authenticate: authenticateToken, // Alias for backward compatibility
  logout,
  requireAdmin,
  requireStaff,
};