const cron = require('node-cron');
const newsletterService = require('../services/newsletterService');
const logger = require('../utils/logger');

class NewsletterJob {
    constructor() {
        this.isRunning = {
            daily: false,
            weekly: false,
        };
    }

    /**
     * Start CRON jobs
     */
    start() {
        // Daily digest - Every day at 8 AM
        cron.schedule('0 8 * * *', async () => {
            if (this.isRunning.daily) {
                logger.warn('Daily digest already running');
                return;
            }

            try {
                this.isRunning.daily = true;
                logger.info('🔄 Starting daily newsletter...');

                const result = await newsletterService.sendDailyDigest();

                logger.info(`✅ Daily newsletter sent: ${result.sent}/${result.total}`);
            } catch (error) {
                logger.error('❌ Daily newsletter failed:', error);
            } finally {
                this.isRunning.daily = false;
            }
        });

        // Weekly digest - Every Monday at 9 AM
        cron.schedule('0 9 * * 1', async () => {
            if (this.isRunning.weekly) {
                logger.warn('Weekly digest already running');
                return;
            }

            try {
                this.isRunning.weekly = true;
                logger.info('🔄 Starting weekly newsletter...');

                const result = await newsletterService.sendWeeklyDigest();

                logger.info(`✅ Weekly newsletter sent: ${result.sent}/${result.total}`);
            } catch (error) {
                logger.error('❌ Weekly newsletter failed:', error);
            } finally {
                this.isRunning.weekly = false;
            }
        });

        logger.info('✅ Newsletter CRON jobs started');
    }

    /**
     * Send newsletter now (manual trigger)
     */
    async sendNow(type = 'daily') {
        try {
            logger.info(`🔄 Sending ${type} newsletter manually...`);

            const result = type === 'daily'
                ? await newsletterService.sendDailyDigest()
                : await newsletterService.sendWeeklyDigest();

            logger.info(`✅ Newsletter sent: ${result.sent}/${result.total}`);

            return result;
        } catch (error) {
            logger.error('Manual newsletter send failed:', error);
            throw error;
        }
    }
}

const newsletterJob = new NewsletterJob();

module.exports = newsletterJob;
