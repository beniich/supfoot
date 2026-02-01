// src/models/Association.js
const mongoose = require('mongoose');

const associationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    logo: {
        type: String,
        default: 'https://via.placeholder.com/150',
    },
    description: String,
    email: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['club', 'league', 'federation', 'media'],
        default: 'club',
    },
    phone: String,
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },

    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    subscription: {
        plan: {
            type: String,
            enum: ['free', 'premium', 'elite'],
            default: 'free',
        },
        status: {
            type: String,
            enum: ['active', 'past_due', 'canceled', 'unpaid'],
            default: 'active',
        },
        stripeCustomerId: String,
        stripeSubscriptionId: String,
        expiresAt: Date,
    },

    settings: {
        primaryColor: { type: String, default: '#007bff' },
        secondaryColor: { type: String, default: '#6c757d' },
        badgeTemplate: { type: String, default: 'default' },
    },

    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});

// Create slug from name before validation
associationSchema.pre('validate', function (next) {
    if (this.name && !this.slug) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-0]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
    next();
});

module.exports = mongoose.model('Association', associationSchema);
