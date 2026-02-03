// server/src/routes/upload.js
const express = require('express');
const router = express.Router();
const { uploadCloudinary } = require('../config/cloudinary');
const { authenticate } = require('../middleware/auth');
const { deleteFromCloudinary } = require('../config/cloudinary');
const User = require('../models/User');

// Upload avatar
router.post('/avatar',
    authenticate,
    uploadCloudinary.single('avatar'),
    async (req, res) => {
        try {
            const user = await User.findById(req.userId);

            // Delete old avatar if exists and looks like a cloudinary url (optimization)
            if (user.avatar && user.avatar.includes('cloudinary')) {
                const publicId = user.avatar.split('/').pop().split('.')[0];
                if (publicId) {
                    await deleteFromCloudinary(`footballhub/${publicId}`);
                }
            }

            // Update user avatar
            user.avatar = req.file.path;
            await user.save();

            res.json({
                success: true,
                avatar: req.file.path,
            });
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({
                success: false,
                message: 'Upload failed',
            });
        }
    }
);

// Upload product images
router.post('/product',
    authenticate,
    uploadCloudinary.array('images', 5),
    async (req, res) => {
        try {
            const images = req.files.map(file => file.path);

            res.json({
                success: true,
                images,
            });
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({
                success: false,
                message: 'Upload failed',
            });
        }
    }
);

module.exports = router;
