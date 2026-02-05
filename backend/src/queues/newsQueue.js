const { Queue, Worker } = require('bullmq');
const newsService = require('../services/newsService');
const sportmonks = require('../config/sportmonks');
const League = require('../models/League');
const logger = require('../utils/logger');
const redisConfig = {
    connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
    },
};

// 1. Définition de la Queue
const newsQueue = new Queue('news-sync', redisConfig);

// 2. Logique de synchronisation complète (déplacée depuis newsSyncJob)
async function syncAllLeaguesNews() {
    // Get featured leagues
    const leagues = await League.find({ priority: { $gte: 8 } }).select('_id externalId name');
    logger.info(`🏗️ Worker: Syncing news for ${leagues.length} featured leagues`);

    let totalSynced = 0;

    for (const league of leagues) {
        try {
            if (league.externalId) {
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
        }
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Sync general news
    try {
        const generalResult = await newsService.syncNews(null, 20);
        totalSynced += generalResult.synced;
        logger.info(`✅ General news: ${generalResult.synced} new articles`);
    } catch (error) {
        logger.error('Failed to sync general news:', error.message);
    }

    return { totalSynced };
}

// 3. Définition du Worker
const newsWorker = new Worker('news-sync', async (job) => {
    logger.info(`🏗️ Job ${job.id}: Début synchronisation news...`);

    try {
        // Si des paramètres spécifiques sont passés
        if (job.data.seasonId) {
            return await newsService.syncNews(job.data.seasonId, job.data.limit || 50);
        }

        // Sinon sync complète
        return await syncAllLeaguesNews();

    } catch (error) {
        logger.error(`❌ Job ${job.id}: Echec synchronisation`, error);
        throw error;
    }
}, {
    ...redisConfig,
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 500 },
});

newsWorker.on('completed', (job, returnvalue) => {
    logger.info(`✅ Job ${job.id} complété. Articles: ${returnvalue?.totalSynced || returnvalue?.synced || 0}`);
});

newsWorker.on('failed', (job, error) => {
    logger.error(`❌ Job ${job.id} a échoué: ${error.message}`);
});

module.exports = { newsQueue, newsWorker };
