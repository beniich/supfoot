const Comment = require('../models/Comment');
const News = require('../models/News');
const logger = require('../utils/logger');

class CommentService {
    /**
     * Add comment
     */
    async addComment(userId, newsId, content, parentCommentId = null) {
        try {
            // Validate content
            if (!content || content.trim().length === 0) {
                throw new Error('Comment content is required');
            }

            // Check if news exists
            const news = await News.findById(newsId);
            if (!news) {
                throw new Error('News not found');
            }

            // If reply, check parent comment exists
            if (parentCommentId) {
                const parentComment = await Comment.findById(parentCommentId);
                if (!parentComment) {
                    throw new Error('Parent comment not found');
                }
            }

            // Create comment
            const comment = await Comment.create({
                news: newsId,
                user: userId,
                content: content.trim(),
                parentComment: parentCommentId,
            });

            // Populate user info
            await comment.populate('user', 'firstName lastName avatar');

            logger.info(`Comment added: ${comment._id} by ${userId}`);

            return { success: true, comment };
        } catch (error) {
            logger.error('Add comment error:', error);
            throw error;
        }
    }

    /**
     * Get comments for news article
     */
    async getComments(newsId, page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;

            // Get top-level comments (no parent)
            const [comments, total] = await Promise.all([
                Comment.find({
                    news: newsId,
                    parentComment: null,
                    status: 'approved',
                })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .populate('user', 'firstName lastName avatar')
                    .populate({
                        path: 'replyCount',
                    }),
                Comment.countDocuments({
                    news: newsId,
                    parentComment: null,
                    status: 'approved',
                }),
            ]);

            return {
                comments,
                pagination: {
                    total,
                    page,
                    limit,
                    pages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            logger.error('Get comments error:', error);
            throw error;
        }
    }

    /**
     * Get replies for a comment
     */
    async getReplies(commentId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;

            const [replies, total] = await Promise.all([
                Comment.find({
                    parentComment: commentId,
                    status: 'approved',
                })
                    .sort({ createdAt: 1 })
                    .skip(skip)
                    .limit(limit)
                    .populate('user', 'firstName lastName avatar'),
                Comment.countDocuments({
                    parentComment: commentId,
                    status: 'approved',
                }),
            ]);

            return {
                replies,
                pagination: {
                    total,
                    page,
                    limit,
                    pages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            logger.error('Get replies error:', error);
            throw error;
        }
    }

    /**
     * Update comment
     */
    async updateComment(commentId, userId, content) {
        try {
            const comment = await Comment.findOne({ _id: commentId, user: userId });

            if (!comment) {
                return { success: false, message: 'Comment not found or unauthorized' };
            }

            comment.content = content.trim();
            comment.edited = true;
            comment.editedAt = new Date();
            await comment.save();

            logger.info(`Comment updated: ${commentId}`);

            return { success: true, comment };
        } catch (error) {
            logger.error('Update comment error:', error);
            throw error;
        }
    }

    /**
     * Delete comment
     */
    async deleteComment(commentId, userId) {
        try {
            const comment = await Comment.findOne({ _id: commentId, user: userId });

            if (!comment) {
                return { success: false, message: 'Comment not found or unauthorized' };
            }

            // Delete comment and all replies
            await Comment.deleteMany({
                $or: [
                    { _id: commentId },
                    { parentComment: commentId },
                ],
            });

            logger.info(`Comment deleted: ${commentId}`);

            return { success: true };
        } catch (error) {
            logger.error('Delete comment error:', error);
            throw error;
        }
    }

    /**
     * Like/Unlike comment
     */
    async toggleLike(commentId, userId) {
        try {
            const comment = await Comment.findById(commentId);

            if (!comment) {
                return { success: false, message: 'Comment not found' };
            }

            const likeIndex = comment.likes.indexOf(userId);
            const dislikeIndex = comment.dislikes.indexOf(userId);

            // Remove dislike if exists
            if (dislikeIndex > -1) {
                comment.dislikes.splice(dislikeIndex, 1);
            }

            // Toggle like
            if (likeIndex > -1) {
                comment.likes.splice(likeIndex, 1);
            } else {
                comment.likes.push(userId);
            }

            await comment.save();

            return {
                success: true,
                liked: likeIndex === -1,
                likeCount: comment.likes.length,
                dislikeCount: comment.dislikes.length,
            };
        } catch (error) {
            logger.error('Toggle like error:', error);
            throw error;
        }
    }

    /**
     * Flag comment
     */
    async flagComment(commentId, userId, reason) {
        try {
            const comment = await Comment.findById(commentId);

            if (!comment) {
                return { success: false, message: 'Comment not found' };
            }

            // Check if already flagged by this user
            const alreadyFlagged = comment.flaggedBy.some(
                f => f.user.toString() === userId.toString()
            );

            if (alreadyFlagged) {
                return { success: false, message: 'Already flagged' };
            }

            comment.flaggedBy.push({
                user: userId,
                reason,
            });

            // Auto-moderate if flagged by 5+ users
            if (comment.flaggedBy.length >= 5) {
                comment.status = 'flagged';
            }

            await comment.save();

            return { success: true };
        } catch (error) {
            logger.error('Flag comment error:', error);
            throw error;
        }
    }
}

module.exports = new CommentService();
