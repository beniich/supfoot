const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        news: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'News',
            required: true,
        },

        collectionName: {
            type: String,
            default: 'default',
        },

        notes: {
            type: String,
            maxlength: 500,
        },

        tags: [String],
    },
    {
        timestamps: true,
    }
);

// Compound index to prevent duplicates
bookmarkSchema.index({ user: 1, news: 1 }, { unique: true });
bookmarkSchema.index({ user: 1, collectionName: 1, createdAt: -1 });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
