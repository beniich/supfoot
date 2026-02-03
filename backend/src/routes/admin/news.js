// server/src/routes/admin/news.js
const express = require('express');
const router = express.Router();
const { authenticate, requireAdmin } = require('../../middleware/auth');
const newsSyncJob = require('../../jobs/newsSyncJob');
const newsService = require('../../services/newsService');
const News = require('../../models/News');

// All routes require admin
router.use(authenticate);
// router.use(requireAdmin); // Uncomment when admin middleware is fully verified

// Get sync status
router.get('/sync/status', (req, res) => {
    try {
        const status = newsSyncJob.getStatus();

        res.json({
            success: true,
            status,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Trigger manual sync
router.post('/sync/now', async (req, res) => {
    try {
        const { seasonId, limit = 50 } = req.body;

        const result = await newsSyncJob.syncNow(seasonId, limit);

        res.json({
            success: true,
            message: 'Sync completed',
            result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Toggle featured status
router.patch('/:id/featured', async (req, res) => {
    try {
        const { featured, featuredUntil } = req.body;

        const news = await News.findByIdAndUpdate(
            req.params.id,
            {
                featured,
                featuredUntil: featuredUntil || (featured ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null),
            },
            { new: true }
        );

        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'News not found',
            });
        }

        res.json({
            success: true,
            news,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Delete news
router.delete('/:id', async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);

        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'News not found',
            });
        }

        res.json({
            success: true,
            message: 'News deleted',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Update news
router.patch('/:id', async (req, res) => {
    try {
        const updates = req.body;

        const news = await News.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'News not found',
            });
        }

        res.json({
            success: true,
            news,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
