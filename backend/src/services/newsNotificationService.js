const PushNotificationService = require('./pushNotificationService');
const User = require('../models/User');
const News = require('../models/News');
const logger = require('../utils/logger');

class NewsNotificationService {
    /**
     * Send breaking news notification to all users
     */
    async sendBreakingNews(newsId) {
        try {
            const news = await News.findById(newsId).populate('league teams');

            if (!news) {
                throw new Error('News not found');
            }

            const notification = {
                title: '🚨 Breaking News !',
                body: news.title,
                imageUrl: news.image,
                data: {
                    type: 'breaking_news',
                    newsId: news._id.toString(),
                    category: news.category,
                },
            };

            // Send to topic "breaking_news"
            const result = await PushNotificationService.sendToTopic('breaking_news', notification);

            logger.info(`Breaking news notification sent: ${news._id}`);

            return result;
        } catch (error) {
            logger.error('Breaking news notification error:', error);
            throw error;
        }
    }

    /**
     * Send transfer alert to users following specific teams
     */
    async sendTransferAlert(newsId) {
        try {
            const news = await News.findById(newsId).populate('teams');

            if (!news || news.category !== 'Transfers') {
                return;
            }

            // Get users following these teams
            const teamIds = news.teams.map(t => t._id);
            const users = await User.find({
                favoriteTeams: { $in: teamIds },
                'notificationSettings.transfers': true,
            }).select('_id fcmTokens');

            if (users.length === 0) {
                logger.info('No users to notify for transfer');
                return;
            }

            const notification = {
                title: '🔄 Alerte Transfert !',
                body: news.title,
                imageUrl: news.image,
                data: {
                    type: 'transfer_alert',
                    newsId: news._id.toString(),
                    teams: teamIds.map(id => id.toString()),
                },
            };

            // Send to all users
            const userIds = users.map(u => u._id);
            const result = await PushNotificationService.sendToMultipleUsers(userIds, notification);

            logger.info(`Transfer alert sent to ${userIds.length} users`);

            return result;
        } catch (error) {
            logger.error('Transfer alert error:', error);
            throw error;
        }
    }

    /**
     * Send injury alert
     */
    async sendInjuryAlert(newsId) {
        try {
            const news = await News.findById(newsId).populate('teams players');

            if (!news || news.category !== 'Injuries') {
                return;
            }

            const teamIds = news.teams.map(t => t._id);
            const users = await User.find({
                favoriteTeams: { $in: teamIds },
                'notificationSettings.injuries': true,
            }).select('_id');

            if (users.length === 0) return;

            const notification = {
                title: '⚠️ Alerte Blessure',
                body: news.title,
                imageUrl: news.image,
                data: {
                    type: 'injury_alert',
                    newsId: news._id.toString(),
                },
            };

            const userIds = users.map(u => u._id);
            await PushNotificationService.sendToMultipleUsers(userIds, notification);

            logger.info(`Injury alert sent to ${userIds.length} users`);
        } catch (error) {
            logger.error('Injury alert error:', error);
        }
    }

    /**
     * Auto-detect breaking news and send notification
     */
    async autoNotifyBreakingNews(newsId) {
        try {
            const news = await News.findById(newsId);

            if (!news) return;

            // Breaking news criteria
            const isBreaking =
                news.featured ||
                news.category === 'Transfers' ||
                news.tags.includes('breaking') ||
                news.title.toLowerCase().includes('officiel');

            if (isBreaking) {
                await this.sendBreakingNews(newsId);
            }

            // Category-specific alerts
            if (news.category === 'Transfers') {
                await this.sendTransferAlert(newsId);
            }

            if (news.category === 'Injuries') {
                await this.sendInjuryAlert(newsId);
            }
        } catch (error) {
            logger.error('Auto-notify error:', error);
        }
    }
}

module.exports = new NewsNotificationService();
