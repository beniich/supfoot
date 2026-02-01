// src/middleware/tenant.js
const Association = require('../models/Association');

/**
 * Middleware to enforce multi-tenancy.
 * Ensures that req.associationId is set and that the user belongs to that association.
 */
exports.checkAssociation = async (req, res, next) => {
    try {
        const associationId = req.headers['x-association-id'] || req.user?.associationId;

        if (!associationId) {
            if (req.user?.role === 'admin') {
                // If admin doesn't have an association yet, they might be in the process of creating one
                return next();
            }
            return res.status(403).json({
                success: false,
                message: 'Accès refusé. Aucune association spécifiée.'
            });
        }

        req.associationId = associationId;
        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Middleware to restrict query results to the current association.
 * Can be used in controllers to automatically filter find() queries.
 */
exports.tenantFilter = (req) => {
    return { associationId: req.associationId };
};
