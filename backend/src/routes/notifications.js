const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const User = require('../models/User');

// Get notification settings
router.get('/settings', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('notificationSettings favoriteTeams favoritePlayers');

        res.json({
            success: true,
            settings: user.notificationSettings,
            favoriteTeams: user.favoriteTeams,
            favoritePlayers: user.favoritePlayers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Update notification settings
router.patch('/settings', authenticate, async (req, res) => {
    try {
        const updates = req.body;

        const user = await User.findByIdAndUpdate(
            req.userId,
            { $set: { notificationSettings: updates } },
            { new: true }
        ).select('notificationSettings');

        res.json({
            success: true,
            settings: user.notificationSettings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Add favorite team
router.post('/favorites/teams/:teamId', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user.favoriteTeams.includes(req.params.teamId)) {
            user.favoriteTeams.push(req.params.teamId);
            await user.save();
        }

        res.json({
            success: true,
            favoriteTeams: user.favoriteTeams,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Remove favorite team
router.delete('/favorites/teams/:teamId', authenticate, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            { $pull: { favoriteTeams: req.params.teamId } },
            { new: true }
        ).select('favoriteTeams');

        res.json({
            success: true,
            favoriteTeams: user.favoriteTeams,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
