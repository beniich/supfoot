// src/routes/associationRoutes.js
const express = require('express');
const router = express.Router();
const Association = require('../models/Association');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const badgeService = require('../services/badgeService');
const Member = require('../models/Member');

// @desc    Register a new association
// @route   POST /api/associations
// @access  Private (Registered User)
router.post('/', protect, async (req, res, next) => {
    try {
        const { name, description, email, phone, address } = req.body;

        // Check if user already has an association
        if (req.user.associationId) {
            return res.status(400).json({
                success: false,
                message: 'Vous avez déjà une association enregistrée.'
            });
        }

        const association = await Association.create({
            name,
            description,
            email,
            phone,
            address,
            admin: req.user._id
        });

        // Update user with associationId
        await User.findByIdAndUpdate(req.user._id, {
            associationId: association._id,
            role: 'admin'
        });

        res.status(201).json({
            success: true,
            data: association
        });
    } catch (error) {
        next(error);
    }
});

// @desc    Get association details
// @route   GET /api/associations/me
// @access  Private (Admin)
router.get('/me', protect, async (req, res, next) => {
    try {
        const association = await Association.findById(req.user.associationId);

        if (!association) {
            return res.status(404).json({
                success: false,
                message: 'Association non trouvée.'
            });
        }

        res.status(200).json({
            success: true,
            data: association
        });
    } catch (error) {
        next(error);
    }
});

// @desc    Generate badge for a member
// @route   GET /api/associations/members/:memberId/badge
// @access  Private (Admin)
router.get('/members/:memberId/badge', protect, async (req, res, next) => {
    try {
        const member = await Member.findOne({
            _id: req.params.memberId,
            associationId: req.user.associationId
        });

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Membre non trouvé dans votre association.'
            });
        }

        const association = await Association.findById(req.user.associationId);
        const badgeBuffer = await badgeService.generateBadge(member, association);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=badge-${member.membershipNumber}.pdf`,
            'Content-Length': badgeBuffer.length
        });

        res.send(badgeBuffer);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
