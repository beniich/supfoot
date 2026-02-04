const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const commentService = require('../services/commentService');

// Get comments for news article
router.get('/news/:newsId', async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;

        const result = await commentService.getComments(
            req.params.newsId,
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

// Get replies for comment
router.get('/:commentId/replies', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const result = await commentService.getReplies(
            req.params.commentId,
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

// Add comment (requires auth)
router.post('/', authenticate, async (req, res) => {
    try {
        const { newsId, content, parentCommentId } = req.body;

        const result = await commentService.addComment(
            req.userId,
            newsId,
            content,
            parentCommentId
        );

        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Update comment
router.patch('/:commentId', authenticate, async (req, res) => {
    try {
        const { content } = req.body;

        const result = await commentService.updateComment(
            req.params.commentId,
            req.userId,
            content
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

// Delete comment
router.delete('/:commentId', authenticate, async (req, res) => {
    try {
        const result = await commentService.deleteComment(
            req.params.commentId,
            req.userId
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

// Like comment
router.post('/:commentId/like', authenticate, async (req, res) => {
    try {
        const result = await commentService.toggleLike(
            req.params.commentId,
            req.userId
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

// Flag comment
router.post('/:commentId/flag', authenticate, async (req, res) => {
    try {
        const { reason } = req.body;

        const result = await commentService.flagComment(
            req.params.commentId,
            req.userId,
            reason
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

module.exports = router;
