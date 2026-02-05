const cron = require('node-cron');
const backupService = require('../services/backupService');
const logger = console; // Replace with your logger if you have one

class BackupJob {
    start() {
        // Daily logical backup at 2 AM (Free Tier Compatible)
        cron.schedule('0 2 * * *', async () => {
            try {
                logger.info('🔄 Starting daily logical backup (JSON export)...');

                // Performs a JSON export of critical tables
                const backup = await backupService.createBackup(
                    null, // system level
                    'Automated daily logical backup'
                );

                logger.info(`✅ Logical Backup completed: ${backup.type}`);
            } catch (error) {
                logger.error('❌ Backup failed:', error);
            }
        });

        // Weekly export to S3 (Sunday 3 AM)
        cron.schedule('0 3 * * 0', async () => {
            try {
                logger.info('🔄 Starting weekly S3 export...');

                await backupService.exportToCloud(
                    ['profiles', 'audit_logs'], // Tables to export
                    's3://footballhub-backups/weekly'
                );

                logger.info('✅ S3 export completed');
            } catch (error) {
                logger.error('❌ S3 export failed:', error);
            }
        });

        logger.info('✅ Backup jobs scheduled');
    }
}

module.exports = new BackupJob();
