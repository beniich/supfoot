// server/src/routes/notifications.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const User = require('../models/User');
const PushNotificationService = require('../services/pushNotificationService');

// Register FCM token
router.post('/register-token', authenticate, async (req, res) => {
    try {
        const { token, platform } = req.body;

        const user = await User.findById(req.userId);

        // Add token if not already present
        if (!user.fcmTokens.includes(token)) {
            user.fcmTokens.push(token);
            await user.save();
        }

        // Subscribe to user's favorite topics
        if (user.favoriteTeams && user.favoriteTeams.length > 0) {
            const topics = user.favoriteTeams.map(t => `team_${t}`);
            await Promise.all(
                topics.map(topic =>
                    PushNotificationService.subscribeToTopic([token], topic)
                )
            );
        }

        res.json({
            success: true,
            message: 'FCM token registered',
        });
    } catch (error) {
        console.error('FCM token registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to register FCM token',
        });
    }
});

// Send test notification
router.post('/test', authenticate, async (req, res) => {
    try {
        const result = await PushNotificationService.sendToUser(req.userId, {
            title: 'Test Notification',
            body: 'Ceci est une notification de test de FootballHub+',
            data: { type: 'test' },
        });

        res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error('Test notification error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send test notification',
        });
    }
});

module.exports = router;
