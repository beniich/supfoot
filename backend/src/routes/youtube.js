const express = require('express');
const router = express.Router();
const youtubeService = require('../services/youtubeService');
const { cache } = require('../middleware/cache'); // Assuming cache middleware exists or will use simple caching

// Mock cache middleware if it doesn't exist or just use a simple wrapper
// Reuse cache middleware if available
const withCache = (duration) => {
    // If cache middleware is available in project, use it. 
    // Otherwise fallback to no-op.
    try {
        const { cache } = require('../middleware/cache');
        return cache ? cache(duration) : (req, res, next) => next();
    } catch (e) {
        return (req, res, next) => next();
    }
}

// Search videos
router.get('/search', withCache(3600), async (req, res) => {
    try {
        const { q, maxResults = 10 } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Query parameter required',
            });
        }

        const videos = await youtubeService.searchVideos(q, parseInt(maxResults));

        res.json({
            success: true,
            videos,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Get trending videos
router.get('/trending', withCache(21600), async (req, res) => {
    try {
        const videos = await youtubeService.getTrendingVideos();

        res.json({
            success: true,
            videos,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Get related videos for news
router.get('/news/:newsId/related', withCache(3600), async (req, res) => {
    try {
        // Need News model here to get details
        const News = require('../models/News');
        const news = await News.findById(req.params.newsId).populate('league teams');

        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'News not found',
            });
        }

        const videos = await youtubeService.getRelatedVideos(
            news.title,
            news.league,
            news.teams
        );

        res.json({
            success: true,
            videos,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Get video details
router.get('/video/:videoId', withCache(3600), async (req, res) => {
    try {
        const video = await youtubeService.getVideoDetails(req.params.videoId);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'Video not found',
            });
        }

        res.json({
            success: true,
            video,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
