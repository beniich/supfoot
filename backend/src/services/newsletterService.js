const { sendEmail } = require('../config/resend');
const News = require('../models/News');
const User = require('../models/User');
const logger = require('../utils/logger');

class NewsletterService {
    /**
     * Generate daily digest HTML
     */
    generateDailyDigestHTML(topNews, user) {
        const newsItems = topNews.map(article => `
      <div style="margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px;">
        <img src="${article.image}" alt="${article.title}" 
             style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 15px;">
        
        <div style="background: #F9D406; color: #000; display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; margin-bottom: 10px;">
          ${article.category}
        </div>
        
        <h3 style="margin: 10px 0; color: #1A1915;">
          <a href="https://footballhub.ma/news/${article._id}" 
             style="color: #1A1915; text-decoration: none;">
            ${article.title}
          </a>
        </h3>
        
        <p style="color: #666; line-height: 1.6; margin: 10px 0;">
          ${article.excerpt}
        </p>
        
        <div style="margin-top: 10px;">
          <a href="https://footballhub.ma/news/${article._id}" 
             style="background: #F9D406; color: #000; padding: 8px 20px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: bold;">
            Lire l'article →
          </a>
        </div>
      </div>
    `).join('');

        return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #F9D406 0%, #FBDD28 100%); padding: 40px 30px; text-align: center; }
          .header h1 { color: #000; margin: 0; font-size: 32px; }
          .header p { color: #000; opacity: 0.8; margin: 10px 0 0; }
          .content { padding: 30px; }
          .footer { background: #1A1915; color: white; padding: 30px; text-align: center; font-size: 12px; }
          .footer a { color: #F9D406; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⚽ Votre Résumé Quotidien</h1>
            <p>Les meilleures actualités football du jour</p>
          </div>
          
          <div class="content">
            <p style="color: #666; margin-bottom: 30px;">
              Bonjour ${user.firstName},
            </p>
            
            <p style="color: #666; margin-bottom: 30px;">
              Voici les ${topNews.length} actualités les plus importantes de la journée :
            </p>
            
            ${newsItems}
            
            <div style="text-align: center; margin-top: 40px; padding: 20px; background: #f8f8f8; border-radius: 8px;">
              <p style="margin: 0 0 15px; color: #666;">Vous voulez plus d'actualités ?</p>
              <a href="https://footballhub.ma/news" 
                 style="background: #1A1915; color: #F9D406; padding: 12px 30px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: bold;">
                Voir toutes les news
              </a>
            </div>
          </div>
          
          <div class="footer">
            <p>© 2024 FootballHub+. Tous droits réservés.</p>
            <p style="margin: 10px 0;">
              <a href="https://footballhub.ma/settings/notifications">Gérer mes préférences</a> | 
              <a href="https://footballhub.ma/unsubscribe">Se désabonner</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    }

    /**
     * Generate weekly digest HTML
     */
    generateWeeklyDigestHTML(topNews, stats, user) {
        const newsItems = topNews.slice(0, 10).map(article => `
      <tr>
        <td style="padding: 15px 0; border-bottom: 1px solid #eee;">
          <div style="display: flex; align-items: center;">
            <img src="${article.image}" 
                 style="width: 80px; height: 60px; object-fit: cover; border-radius: 6px; margin-right: 15px;">
            <div>
              <div style="background: #F9D406; color: #000; display: inline-block; padding: 2px 8px; border-radius: 8px; font-size: 10px; font-weight: bold; margin-bottom: 5px;">
                ${article.category}
              </div>
              <h4 style="margin: 5px 0; font-size: 14px;">
                <a href="https://footballhub.ma/news/${article._id}" 
                   style="color: #1A1915; text-decoration: none;">
                  ${article.title}
                </a>
              </h4>
              <p style="color: #999; font-size: 11px; margin: 5px 0;">
                ${article.views.toLocaleString()} vues
              </p>
            </div>
          </div>
        </td>
      </tr>
    `).join('');

        return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #1A1915 0%, #2D2A25 100%); padding: 40px 30px; text-align: center; }
          .header h1 { color: #F9D406; margin: 0; font-size: 32px; }
          .content { padding: 30px; }
          .stats { display: flex; justify-content: space-around; margin: 30px 0; }
          .stat { text-align: center; padding: 20px; background: #f8f8f8; border-radius: 8px; flex: 1; margin: 0 10px; }
          .stat-number { font-size: 32px; font-weight: bold; color: #F9D406; }
          .stat-label { color: #666; font-size: 12px; margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📰 Résumé Hebdomadaire</h1>
            <p style="color: white; opacity: 0.8; margin: 10px 0 0;">
              Les actualités de la semaine
            </p>
          </div>
          
          <div class="content">
            <p style="color: #666;">
              Bonjour ${user.firstName},
            </p>
            
            <p style="color: #666; margin-bottom: 30px;">
              Voici le résumé de cette semaine en chiffres :
            </p>
            
            <div class="stats">
              <div class="stat">
                <div class="stat-number">${stats.totalNews}</div>
                <div class="stat-label">Nouveaux Articles</div>
              </div>
              <div class="stat">
                <div class="stat-number">${stats.totalViews}</div>
                <div class="stat-label">Vues Totales</div>
              </div>
              <div class="stat">
                <div class="stat-number">${stats.topCategory}</div>
                <div class="stat-label">Catégorie Populaire</div>
              </div>
            </div>
            
            <h3 style="color: #1A1915; margin: 30px 0 20px;">
              Top 10 des articles les plus lus :
            </h3>
            
            <table style="width: 100%;">
              ${newsItems}
            </table>
          </div>
        </div>
      </body>
      </html>
    `;
    }

    /**
     * Send daily digest
     */
    async sendDailyDigest() {
        try {
            logger.info('📧 Sending daily digest...');

            // Get top news from last 24 hours
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

            const topNews = await News.find({
                status: 'Published',
                publishedAt: { $gte: yesterday },
            })
                .sort({ views: -1, publishedAt: -1 })
                .limit(5)
                .select('title excerpt image category views _id');

            if (topNews.length === 0) {
                logger.info('No news for daily digest');
                return { sent: 0 };
            }

            // Get users with daily digest enabled
            const users = await User.find({
                'notificationSettings.dailyDigest': true,
            }).select('email firstName');

            if (users.length === 0) {
                logger.info('No users subscribed to daily digest');
                return { sent: 0 };
            }

            let sentCount = 0;

            for (const user of users) {
                try {
                    const html = this.generateDailyDigestHTML(topNews, user);

                    await sendEmail({
                        to: user.email,
                        subject: `📰 Votre résumé quotidien - ${new Date().toLocaleDateString('fr-FR')}`,
                        html,
                    });

                    sentCount++;
                } catch (error) {
                    logger.error(`Failed to send digest to ${user.email}:`, error.message);
                }

                // Rate limiting
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            logger.info(`✅ Daily digest sent to ${sentCount} users`);

            return { sent: sentCount, total: users.length };
        } catch (error) {
            logger.error('Daily digest error:', error);
            throw error;
        }
    }

    /**
     * Send weekly digest
     */
    async sendWeeklyDigest() {
        try {
            logger.info('📧 Sending weekly digest...');

            // Get top news from last 7 days
            const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

            const [topNews, stats] = await Promise.all([
                News.find({
                    status: 'Published',
                    publishedAt: { $gte: lastWeek },
                })
                    .sort({ views: -1 })
                    .limit(10)
                    .select('title excerpt image category views _id'),

                News.aggregate([
                    { $match: { status: 'Published', publishedAt: { $gte: lastWeek } } },
                    {
                        $group: {
                            _id: null,
                            totalNews: { $sum: 1 },
                            totalViews: { $sum: '$views' },
                        },
                    },
                ]),
            ]);

            if (topNews.length === 0) {
                logger.info('No news for weekly digest');
                return { sent: 0 };
            }

            // Get most popular category
            const categoryStats = await News.aggregate([
                { $match: { status: 'Published', publishedAt: { $gte: lastWeek } } },
                { $group: { _id: '$category', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 1 },
            ]);

            const digestStats = {
                totalNews: stats[0]?.totalNews || 0,
                totalViews: stats[0]?.totalViews?.toLocaleString() || '0',
                topCategory: categoryStats[0]?._id || 'N/A',
            };

            // Get users with weekly digest enabled
            const users = await User.find({
                'notificationSettings.weeklyDigest': true,
            }).select('email firstName');

            let sentCount = 0;

            for (const user of users) {
                try {
                    const html = this.generateWeeklyDigestHTML(topNews, digestStats, user);

                    await sendEmail({
                        to: user.email,
                        subject: `📊 Votre résumé hebdomadaire - Semaine ${new Date().getWeek()}`,
                        html,
                    });

                    sentCount++;
                } catch (error) {
                    logger.error(`Failed to send weekly digest to ${user.email}:`, error.message);
                }

                await new Promise(resolve => setTimeout(resolve, 100));
            }

            logger.info(`✅ Weekly digest sent to ${sentCount} users`);

            return { sent: sentCount, total: users.length };
        } catch (error) {
            logger.error('Weekly digest error:', error);
            throw error;
        }
    }
}

// Helper: Get week number
Date.prototype.getWeek = function () {
    const d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
};

module.exports = new NewsletterService();
