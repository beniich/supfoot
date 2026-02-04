const Bookmark = require('../models/Bookmark');
const News = require('../models/News');
const logger = require('../utils/logger');
const mongoose = require('mongoose');

class BookmarkService {
    /**
     * Add bookmark
     */
    async addBookmark(userId, newsId, collection = 'default', notes = '') {
        try {
            // Check if already bookmarked
            const existing = await Bookmark.findOne({ user: userId, news: newsId });

            if (existing) {
                return { success: false, message: 'Already bookmarked' };
            }

            const bookmark = await Bookmark.create({
                user: userId,
                news: newsId,
                collectionName: collection,
                notes,
            });

            logger.info(`Bookmark added: ${userId} -> ${newsId}`);

            return { success: true, bookmark };
        } catch (error) {
            logger.error('Add bookmark error:', error);
            throw error;
        }
    }

    /**
     * Remove bookmark
     */
    async removeBookmark(userId, newsId) {
        try {
            const result = await Bookmark.findOneAndDelete({ user: userId, news: newsId });

            if (!result) {
                return { success: false, message: 'Bookmark not found' };
            }

            logger.info(`Bookmark removed: ${userId} -> ${newsId}`);

            return { success: true };
        } catch (error) {
            logger.error('Remove bookmark error:', error);
            throw error;
        }
    }

    /**
     * Get user bookmarks
     */
    async getUserBookmarks(userId, collection = null, page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const query = { user: userId };

            if (collection) {
                query.collectionName = collection;
            }

            const [bookmarks, total] = await Promise.all([
                Bookmark.find(query)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .populate('news'),
                Bookmark.countDocuments(query),
            ]);

            return {
                bookmarks,
                pagination: {
                    total,
                    page,
                    limit,
                    pages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            logger.error('Get bookmarks error:', error);
            throw error;
        }
    }

    /**
     * Get user collections
     */
    async getUserCollections(userId) {
        try {
            const collections = await Bookmark.aggregate([
                { $match: { user: new mongoose.Types.ObjectId(userId) } },
                {
                    $group: {
                        _id: '$collectionName',
                        count: { $sum: 1 },
                        lastUpdated: { $max: '$createdAt' },
                    },
                },
                { $sort: { lastUpdated: -1 } },
            ]);

            return collections.map(c => ({
                name: c._id,
                count: c.count,
                lastUpdated: c.lastUpdated,
            }));
        } catch (error) {
            logger.error('Get collections error:', error);
            throw error;
        }
    }

    /**
     * Check if bookmarked
     */
    async isBookmarked(userId, newsId) {
        try {
            const bookmark = await Bookmark.findOne({ user: userId, news: newsId });
            return !!bookmark;
        } catch (error) {
            logger.error('Check bookmark error:', error);
            return false;
        }
    }

    /**
     * Update bookmark (notes, collection)
     */
    async updateBookmark(userId, newsId, updates) {
        try {
            const bookmark = await Bookmark.findOneAndUpdate(
                { user: userId, news: newsId },
                updates,
                { new: true }
            );

            if (!bookmark) {
                return { success: false, message: 'Bookmark not found' };
            }

            return { success: true, bookmark };
        } catch (error) {
            logger.error('Update bookmark error:', error);
            throw error;
        }
    }
}

module.exports = new BookmarkService();
