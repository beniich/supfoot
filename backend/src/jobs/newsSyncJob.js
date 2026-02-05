const cron = require('node-cron');
const { newsQueue } = require('../queues/newsQueue');
const logger = require('../utils/logger');

class NewsSyncJob {
    constructor() {
        // Optionnel: on peut garder un état local mais BullMQ gère mieux l'état
    }

    start() {
        // Sync news every 30 minutes
        cron.schedule('*/30 * * * *', async () => {
            logger.info('⏰ CRON: Déclenchement job synchronisation news...');
            try {
                // Ajouter le job à la queue BullMQ
                // removeOnComplete et removeOnFail sont gérés par le worker
                await newsQueue.add('sync-full', {}, {
                    attempts: 3,
                    backoff: {
                        type: 'exponential',
                        delay: 5000,
                    }
                });
                logger.info('✅ CRON: Job ajouté à la queue BullMQ');
            } catch (error) {
                logger.error('❌ CRON: Echec ajout job à la queue:', error);
            }
        });

        logger.info('✅ News sync CRON job started (every 30 minutes) [POWERED BY BULLMQ]');
    }

    async syncNow(seasonId = null, limit = 50) {
        logger.info('🔄 Triggering manually via BullMQ...');
        return await newsQueue.add('sync-manual', { seasonId, limit }, { priority: 1 });
    }

    getStatus() {
        // On pourrait interroger BullMQ pour avoir le statut précis
        return {
            message: 'Managed by BullMQ',
            queueName: 'news-sync'
        };
    }
}

const newsSyncJob = new NewsSyncJob();
module.exports = newsSyncJob;
