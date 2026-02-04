const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const bookmarkService = require('../services/bookmarkService');

// Get user bookmarks
router.get('/', authenticate, async (req, res) => {
    try {
        const { collection, page = 1, limit = 20 } = req.query;

        const result = await bookmarkService.getUserBookmarks(
            req.userId,
            collection,
            parseInt(page),
            parseInt(limit)
        );

        res.json({
            success: true,
            ...result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Get collections
router.get('/collections', authenticate, async (req, res) => {
    try {
        const collections = await bookmarkService.getUserCollections(req.userId);

        res.json({
            success: true,
            collections,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Add bookmark
router.post('/', authenticate, async (req, res) => {
    try {
        const { newsId, collection, notes } = req.body;

        const result = await bookmarkService.addBookmark(
            req.userId,
            newsId,
            collection,
            notes
        );

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Check if bookmarked
router.get('/check/:newsId', authenticate, async (req, res) => {
    try {
        const isBookmarked = await bookmarkService.isBookmarked(
            req.userId,
            req.params.newsId
        );

        res.json({
            success: true,
            isBookmarked,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Update bookmark
router.patch('/:newsId', authenticate, async (req, res) => {
    try {
        const { collection, notes, tags } = req.body;

        const result = await bookmarkService.updateBookmark(
            req.userId,
            req.params.newsId,
            { collectionName: collection, notes, tags }
        );

        if (!result.success) {
            return res.status(404).json(result);
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Remove bookmark
router.delete('/:newsId', authenticate, async (req, res) => {
    try {
        const result = await bookmarkService.removeBookmark(
            req.userId,
            req.params.newsId
        );

        if (!result.success) {
            return res.status(404).json(result);
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
