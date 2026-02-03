// server/src/services/pushNotificationService.js
const admin = require('../config/firebase');
const User = require('../models/User');
const logger = require('../utils/logger');

class PushNotificationService {
    /**
     * Send notification to a single user
     */
    static async sendToUser(userId, notification) {
        try {
            const user = await User.findById(userId).select('fcmTokens');

            if (!user || !user.fcmTokens || user.fcmTokens.length === 0) {
                logger.warn(`No FCM tokens found for user ${userId}`);
                return { success: false, reason: 'No FCM tokens' };
            }

            const message = {
                notification: {
                    title: notification.title,
                    body: notification.body,
                    imageUrl: notification.image,
                },
                data: notification.data || {},
                tokens: user.fcmTokens,
                android: {
                    priority: 'high',
                    notification: {
                        channelId: 'footballhub_alerts',
                        sound: 'default',
                        color: '#F9D406',
                    },
                },
                apns: {
                    payload: {
                        aps: {
                            sound: 'default',
                            badge: 1,
                        },
                    },
                },
            };

            const response = await admin.messaging().sendEachForMulticast(message);

            // Remove invalid tokens
            const invalidTokens = [];
            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    if (resp.error.code === 'messaging/invalid-registration-token' ||
                        resp.error.code === 'messaging/registration-token-not-registered') {
                        invalidTokens.push(user.fcmTokens[idx]);
                    }
                }
            });

            if (invalidTokens.length > 0) {
                await User.findByIdAndUpdate(userId, {
                    $pull: { fcmTokens: { $in: invalidTokens } },
                });
                logger.info(`Removed ${invalidTokens.length} invalid FCM tokens for user ${userId}`);
            }

            logger.info(`Push notification sent to user ${userId}: ${response.successCount}/${user.fcmTokens.length} delivered`);

            return {
                success: true,
                successCount: response.successCount,
                failureCount: response.failureCount,
            };
        } catch (error) {
            logger.error('Push notification error:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Send notification to multiple users
     */
    static async sendToMultipleUsers(userIds, notification) {
        const results = await Promise.all(
            userIds.map(userId => this.sendToUser(userId, notification))
        );

        const totalSuccess = results.reduce((acc, r) => acc + (r.successCount || 0), 0);
        const totalFailure = results.reduce((acc, r) => acc + (r.failureCount || 0), 0);

        return {
            success: true,
            totalSuccess,
            totalFailure,
            results,
        };
    }

    /**
     * Send notification to a topic
     */
    static async sendToTopic(topic, notification) {
        try {
            const message = {
                notification: {
                    title: notification.title,
                    body: notification.body,
                    imageUrl: notification.image,
                },
                data: notification.data || {},
                topic: topic,
                android: {
                    priority: 'high',
                    notification: {
                        channelId: 'footballhub_alerts',
                        sound: 'default',
                        color: '#F9D406',
                    },
                },
                apns: {
                    payload: {
                        aps: {
                            sound: 'default',
                            badge: 1,
                        },
                    },
                },
            };

            const response = await admin.messaging().send(message);

            logger.info(`Push notification sent to topic ${topic}: ${response}`);

            return { success: true, messageId: response };
        } catch (error) {
            logger.error('Topic notification error:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Subscribe user to topic
     */
    static async subscribeToTopic(tokens, topic) {
        try {
            const response = await admin.messaging().subscribeToTopic(tokens, topic);

            logger.info(`Subscribed ${response.successCount} devices to topic ${topic}`);

            return {
                success: true,
                successCount: response.successCount,
                failureCount: response.failureCount,
            };
        } catch (error) {
            logger.error('Subscribe to topic error:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Unsubscribe user from topic
     */
    static async unsubscribeFromTopic(tokens, topic) {
        try {
            const response = await admin.messaging().unsubscribeFromTopic(tokens, topic);

            logger.info(`Unsubscribed ${response.successCount} devices from topic ${topic}`);

            return {
                success: true,
                successCount: response.successCount,
                failureCount: response.failureCount,
            };
        } catch (error) {
            logger.error('Unsubscribe from topic error:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Notify match start (5 minutes before)
     */
    static async notifyMatchStart(match, userIds) {
        const notification = {
            title: '⚽ Le match commence bientôt !',
            body: `${match.homeTeam.name} vs ${match.awayTeam.name} dans 5 minutes`,
            image: match.homeTeam.logo,
            data: {
                type: 'match_start',
                matchId: match._id.toString(),
                leagueId: match.league.toString(),
            },
        };

        return await this.sendToMultipleUsers(userIds, notification);
    }

    /**
     * Notify goal
     */
    static async notifyGoal(match, goalEvent, userIds) {
        const team = goalEvent.team === 'home' ? match.homeTeam.name : match.awayTeam.name;
        const player = goalEvent.player;

        const notification = {
            title: '⚽ BUUUUT !',
            body: `${player} marque pour ${team} ! ${match.homeTeam.score} - ${match.awayTeam.score}`,
            image: match.league.logo,
            data: {
                type: 'goal',
                matchId: match._id.toString(),
                eventId: goalEvent._id.toString(),
            },
        };

        return await this.sendToMultipleUsers(userIds, notification);
    }

    /**
     * Notify match result
     */
    static async notifyMatchResult(match, userIds) {
        const notification = {
            title: '🏁 Match terminé !',
            body: `${match.homeTeam.name} ${match.homeTeam.score} - ${match.awayTeam.score} ${match.awayTeam.name}`,
            image: match.league.logo,
            data: {
                type: 'match_result',
                matchId: match._id.toString(),
            },
        };

        return await this.sendToMultipleUsers(userIds, notification);
    }

    /**
     * Notify ticket validated
     */
    static async notifyTicketValidated(ticket) {
        const notification = {
            title: '✅ Billet validé !',
            body: `Votre billet pour ${ticket.event.title} a été validé avec succès`,
            image: ticket.event.image,
            data: {
                type: 'ticket_validated',
                ticketId: ticket._id.toString(),
                eventId: ticket.event._id.toString(),
            },
        };

        return await this.sendToUser(ticket.member._id, notification);
    }

    /**
     * Notify order shipped
     */
    static async notifyOrderShipped(order) {
        const notification = {
            title: '📦 Commande expédiée !',
            body: `Votre commande #${order.orderNumber} a été expédiée`,
            data: {
                type: 'order_shipped',
                orderId: order._id.toString(),
                trackingNumber: order.trackingNumber,
            },
        };

        return await this.sendToUser(order.user._id, notification);
    }
}

module.exports = PushNotificationService;
