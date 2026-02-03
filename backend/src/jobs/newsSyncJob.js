// server/src/jobs/newsSyncJob.js
const cron = require('node-cron');
const newsService = require('../services/newsService');
const sportmonks = require('../config/sportmonks');
const League = require('../models/League');
const logger = require('../utils/logger');

class NewsSyncJob {
    constructor() {
        this.isRunning = false;
        this.lastSync = null;
        this.syncErrors = 0;
    }

    /**
     * Start CRON job
     */
    start() {
        // Sync news every 30 minutes
        cron.schedule('*/30 * * * *', async () => {
            if (this.isRunning) {
                logger.warn('News sync already running, skipping...');
                return;
            }

            try {
                this.isRunning = true;
                logger.info('🔄 Starting automated news sync...');

                await this.syncAllLeaguesNews();

                this.lastSync = new Date();
                this.syncErrors = 0;
                logger.info('✅ Automated news sync completed');
            } catch (error) {
                this.syncErrors++;
                logger.error('❌ Automated news sync failed:', error);

                // Alert if too many errors
                if (this.syncErrors >= 5) {
                    logger.error('🚨 Too many sync errors! Manual intervention required.');
                    // TODO: Send alert to admin
                }
            } finally {
                this.isRunning = false;
            }
        });

        logger.info('✅ News sync CRON job started (every 30 minutes)');
    }

    /**
     * Sync news for all featured leagues
     */
    async syncAllLeaguesNews() {
        try {
            // Get featured leagues
            const leagues = await League.find({ priority: { $gte: 8 } }).select('_id externalId name');

            logger.info(`Syncing news for ${leagues.length} featured leagues`);

            let totalSynced = 0;

            for (const league of leagues) {
                try {
                    if (league.externalId) {
                        // Get current season for league
                        const leagueData = await sportmonks.getLeague(league.externalId);
                        const currentSeason = leagueData.data?.currentSeason?.id;

                        if (currentSeason) {
                            const result = await newsService.syncNews(currentSeason, 10);
                            totalSynced += result.synced;

                            logger.info(`✅ ${league.name}: ${result.synced} new articles`);
                        }
                    }
                } catch (error) {
                    logger.error(`Failed to sync news for ${league.name}:`, error.message);
                    // Continue with other leagues
                }

                // Rate limiting: wait 2 seconds between leagues
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

            // Also sync general news (no specific league)
            try {
                const generalResult = await newsService.syncNews(null, 20);
                totalSynced += generalResult.synced;
                logger.info(`✅ General news: ${generalResult.synced} new articles`);
            } catch (error) {
                logger.error('Failed to sync general news:', error.message);
            }

            logger.info(`🎉 Total synced: ${totalSynced} new articles`);

            return { totalSynced };
        } catch (error) {
            logger.error('Sync all leagues news error:', error);
            throw error;
        }
    }

    /**
     * Sync news on-demand
     */
    async syncNow(seasonId = null, limit = 50) {
        if (this.isRunning) {
            throw new Error('Sync already in progress');
        }

        try {
            this.isRunning = true;
            logger.info('🔄 Starting manual news sync...');

            const result = seasonId
                ? await newsService.syncNews(seasonId, limit)
                : await this.syncAllLeaguesNews();

            this.lastSync = new Date();
            logger.info('✅ Manual news sync completed');

            return result;
        } finally {
            this.isRunning = false;
        }
    }

    /**
     * Get job status
     */
    getStatus() {
        return {
            isRunning: this.isRunning,
            lastSync: this.lastSync,
            syncErrors: this.syncErrors,
            nextSync: this.getNextSyncTime(),
        };
    }

    /**
     * Get next sync time (approximate)
     */
    getNextSyncTime() {
        if (!this.lastSync) return 'Pending...';

        const nextSync = new Date(this.lastSync.getTime() + 30 * 60 * 1000);
        return nextSync;
    }
}

const newsSyncJob = new NewsSyncJob();

module.exports = newsSyncJob;
