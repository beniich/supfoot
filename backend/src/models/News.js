// server/src/models/News.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
    {
        // External reference (SportMonks ID)
        externalId: {
            type: Number,
            unique: true,
            sparse: true,
        },

        // Content
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        slug: {
            type: String,
            unique: true,
            lowercase: true,
        },

        excerpt: {
            type: String,
            maxlength: 300,
        },

        content: {
            type: String,
            required: true,
        },

        // Media
        image: {
            type: String,
        },

        images: [String],

        video: {
            type: String,
        },

        // Author & Source
        author: {
            type: String,
            default: 'FootballHub+',
        },

        source: {
            type: String,
            enum: ['SportMonks', 'API-Football', 'Manual', 'RSS'],
            default: 'Manual',
        },

        sourceUrl: {
            type: String,
        },

        // Classification
        category: {
            type: String,
            enum: ['Transfers', 'Injuries', 'Matches', 'Interviews', 'Rumors', 'General'],
            default: 'General',
        },

        tags: [String],

        // Relations
        league: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'League',
        },

        teams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Team',
            },
        ],

        players: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player',
            },
        ],

        relatedMatch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Match',
        },

        // Publication
        status: {
            type: String,
            enum: ['Draft', 'Published', 'Archived'],
            default: 'Published',
        },

        publishedAt: {
            type: Date,
            default: Date.now,
        },

        // Engagement
        views: {
            type: Number,
            default: 0,
        },

        likes: {
            type: Number,
            default: 0,
        },

        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                content: String,
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

        // SEO
        metaTitle: String,
        metaDescription: String,
        keywords: [String],

        // Featured
        featured: {
            type: Boolean,
            default: false,
        },

        featuredUntil: Date,
    },
    {
        timestamps: true,
    }
);

// Indexes
newsSchema.index({ title: 'text', content: 'text', excerpt: 'text' });
newsSchema.index({ publishedAt: -1 });
newsSchema.index({ status: 1, publishedAt: -1 });
newsSchema.index({ category: 1, publishedAt: -1 });
newsSchema.index({ league: 1, publishedAt: -1 });
newsSchema.index({ teams: 1, publishedAt: -1 });
newsSchema.index({ featured: 1, publishedAt: -1 });

// Virtual for URL
newsSchema.virtual('url').get(function () {
    return `/news/${this.slug || this._id}`;
});

// Pre-save hook to generate slug
newsSchema.pre('save', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    next();
});

// Pre-save hook for featured until
newsSchema.pre('save', function (next) {
    if (this.isModified('featured') && this.featured && !this.featuredUntil) {
        // Featured for 7 days by default
        this.featuredUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }
    next();
});

// Method to check if still featured
newsSchema.methods.isFeatured = function () {
    if (!this.featured) return false;
    if (!this.featuredUntil) return true;
    return new Date() < this.featuredUntil;
};

// Static method to get featured news
newsSchema.statics.getFeatured = function (limit = 5) {
    return this.find({
        status: 'Published',
        featured: true,
        $or: [
            { featuredUntil: { $exists: false } },
            { featuredUntil: { $gte: new Date() } },
        ],
    })
        .sort({ publishedAt: -1 })
        .limit(limit)
        .populate('league teams');
};

module.exports = mongoose.model('News', newsSchema);
