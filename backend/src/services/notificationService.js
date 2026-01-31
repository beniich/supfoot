// src/services/notificationService.js
const User = require('../models/User');
const Match = require('../models/Match');

class NotificationService {
  constructor() {
    // Firebase Admin will be initialized if credentials are available
    this.admin = null;
    try {
      if (process.env.FIREBASE_PROJECT_ID) {
        this.admin = require('firebase-admin');
        const serviceAccount = require('../../config/firebase-service-account.json');
        
        if (!this.admin.apps.length) {
          this.admin.initializeApp({
            credential: this.admin.credential.cert(serviceAccount),
          });
        }
        console.log('✅ Firebase Admin initialized');
      }
    } catch (error) {
      console.log('⚠️  Firebase not configured, notifications disabled');
    }
  }

  // ============================================================
  // SEND TO USER
  // ============================================================

  async sendToUser(userId, notification) {
    if (!this.admin) {
      console.log('Firebase not configured');
      return;
    }

    try {
      const user = await User.findById(userId);
      if (!user || !user.pushToken) {
        console.log('User has no push token');
        return;
      }

      const message = {
        token: user.pushToken,
        notification: {
          title: notification.title,
          body: notification.body,
        },
        data: notification.data || {},
        android: {
          priority: 'high',
          notification: {
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

      const response = await this.admin.messaging().send(message);
      console.log('✅ Notification sent:', response);
      return response;
    } catch (error) {
      console.error('❌ Notification error:', error.message);
    }
  }

  // ============================================================
  // SEND TO MULTIPLE USERS
  // ============================================================

  async sendToMultiple(userIds, notification) {
    if (!this.admin) return;

    try {
      const users = await User.find({
        _id: { $in: userIds },
        pushToken: { $exists: true, $ne: null },
      });

      const tokens = users.map((u) => u.pushToken);
      if (tokens.length === 0) return;

      const message = {
        tokens,
        notification: {
          title: notification.title,
          body: notification.body,
        },
        data: notification.data || {},
      };

      const response = await this.admin.messaging().sendMulticast(message);
      console.log(`✅ Sent to ${response.successCount} devices`);
      return response;
    } catch (error) {
      console.error('❌ Multicast error:', error.message);
    }
  }

  // ============================================================
  // SEND TO TOPIC
  // ============================================================

  async sendToTopic(topic, notification) {
    if (!this.admin) return;

    try {
      const message = {
        topic,
        notification: {
          title: notification.title,
          body: notification.body,
        },
        data: notification.data || {},
      };

      const response = await this.admin.messaging().send(message);
      console.log('✅ Topic notification sent:', response);
      return response;
    } catch (error) {
      console.error('❌ Topic notification error:', error.message);
    }
  }

  // ============================================================
  // MATCH NOTIFICATIONS
  // ============================================================

  async notifyMatchStart(matchId) {
    const match = await Match.findById(matchId)
      .populate('league', 'name')
      .populate('homeTeam.team', 'name')
      .populate('awayTeam.team', 'name');

    if (!match) return;

    const users = await User.find({
      $or: [
        { favoriteTeams: { $in: [match.homeTeam.team, match.awayTeam.team] } },
        { favoriteLeagues: match.league._id },
      ],
      'notificationSettings.matchStart': true,
    });

    await this.sendToMultiple(
      users.map((u) => u._id),
      {
        title: '⚽ Match en direct !',
        body: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
        data: {
          type: 'match_start',
          matchId: match._id.toString(),
        },
      }
    );
  }

  async notifyGoal(matchId, goalData) {
    const match = await Match.findById(matchId)
      .populate('homeTeam.team', 'name')
      .populate('awayTeam.team', 'name');

    await this.sendToTopic(`match_${matchId}`, {
      title: '⚽ BUUUUT !',
      body: `${goalData.player} (${goalData.team})`,
      data: {
        type: 'goal',
        matchId: matchId.toString(),
      },
    });
  }

  async notifyMatchResult(matchId) {
    const match = await Match.findById(matchId)
      .populate('homeTeam.team', 'name')
      .populate('awayTeam.team', 'name');

    const users = await User.find({
      favoriteTeams: { $in: [match.homeTeam.team, match.awayTeam.team] },
      'notificationSettings.matchResult': true,
    });

    await this.sendToMultiple(
      users.map((u) => u._id),
      {
        title: '🏁 Match terminé',
        body: `${match.homeTeam.name} ${match.score.fulltime.home} - ${match.score.fulltime.away} ${match.awayTeam.name}`,
        data: {
          type: 'match_result',
          matchId: matchId.toString(),
        },
      }
    );
  }
}

module.exports = new NotificationService();