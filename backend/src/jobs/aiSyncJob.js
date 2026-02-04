import cron from 'node-cron';
import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import logger from '../utils/logger.js';
import UEFAScraper from '../scrapers/uefaScraper.js';
import ChampionsLeagueAgent from '../services/aiAgent.js';
import Match from '../models/Match.js';
import AIKnowledge from '../models/AIKnowledge.js';

/**
 * 🔄 Job de synchronisation automatique
 * Scrape + Analyse IA toutes les X minutes
 */
class AISyncJob {
  constructor() {
    // Configuration Redis
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    this.connection = new Redis(redisUrl, {
      maxRetriesPerRequest: null
    });

    // Queue BullMQ
    this.queue = new Queue('ai-sync', { 
      connection: this.connection 
    });

    // Workers
    this.workers = [];
    
    // Services
    this.scraper = new UEFAScraper();
    this.agent = new ChampionsLeagueAgent();
    
    this.isRunning = false;
  }

  /**
   * Démarrer le job CRON
   */
  start() {
    if (this.isRunning) {
      logger.warn('AI Sync Job already running');
      return;
    }

    const intervalMinutes = parseInt(process.env.SCRAPING_INTERVAL_MINUTES) || 60;
    const cronExpression = `*/${intervalMinutes} * * * *`;

    logger.info(`🚀 Starting AI Sync Job with interval: ${intervalMinutes} minutes`);

    // CRON pour ajouter des jobs à la queue
    this.cronJob = cron.schedule(cronExpression, async () => {
      try {
        logger.info('⏰ CRON triggered - Adding sync job to queue');
        
        await this.queue.add('full-sync', {
          timestamp: new Date(),
          type: 'scheduled'
        }, {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 5000
          }
        });
        
      } catch (error) {
        logger.error('Failed to add sync job:', error);
      }
    });

    // Worker pour traiter les jobs
    this.startWorkers();
    
    this.isRunning = true;
    logger.info('✅ AI Sync Job started successfully');
  }

  /**
   * Démarrer les workers BullMQ
   */
  startWorkers() {
    const workerCount = parseInt(process.env.REDIS_WORKERS) || 2;

    for (let i = 0; i < workerCount; i++) {
      const worker = new Worker('ai-sync', async (job) => {
        return await this.processSyncJob(job);
      }, {
        connection: this.connection,
        concurrency: 1
      });

      worker.on('completed', (job) => {
        logger.info(`✅ Job ${job.id} completed successfully`);
      });

      worker.on('failed', (job, err) => {
        logger.error(`❌ Job ${job.id} failed:`, err);
      });

      this.workers.push(worker);
      logger.info(`Worker #${i + 1} started`);
    }
  }

  /**
   * Traiter un job de synchronisation
   */
  async processSyncJob(job) {
    const startTime = Date.now();
    logger.info(`🔄 Processing sync job ${job.id}...`);

    const results = {
      matches: {
        scraped: 0,
        analyzed: 0,
        errors: 0
      },
      standings: {
        scraped: false,
        error: null
      },
      duration: 0
    };

    try {
      // Initialiser l'agent IA
      await this.agent.initialize();

      // 1. Scraper les prochains matchs
      logger.info('📡 Step 1/4: Scraping upcoming matches...');
      const upcomingMatches = await this.scrapeAndSaveMatches();
      results.matches.scraped = upcomingMatches.length;

      // 2. Scraper les classements
      logger.info('📡 Step 2/4: Scraping standings...');
      try {
        await this.scrapeStandings();
        results.standings.scraped = true;
      } catch (error) {
        logger.error('Failed to scrape standings:', error);
        results.standings.error = error.message;
      }

      // 3. Analyser les matchs avec l'IA
      logger.info('🤖 Step 3/4: Analyzing matches with AI...');
      const analyzedCount = await this.analyzeRecentMatches();
      results.matches.analyzed = analyzedCount;

      // 4. Nettoyer les données expirées
      logger.info('🧹 Step 4/4: Cleaning expired data...');
      await this.cleanupExpiredData();

      results.duration = Date.now() - startTime;
      
      logger.info(`✅ Sync completed in ${results.duration}ms:`, results);
      
      return results;

    } catch (error) {
      logger.error('Sync job failed:', error);
      results.duration = Date.now() - startTime;
      throw error;
    } finally {
      // Fermer le navigateur Puppeteer
      await this.scraper.closeBrowser();
    }
  }

  /**
   * Scraper et sauvegarder les matchs
   */
  async scrapeAndSaveMatches() {
    try {
      const upcomingData = await this.scraper.scrapeUpcomingMatches();
      const savedMatches = [];

      for (const matchData of upcomingData.matches) {
        try {
          // Vérifier si le match existe déjà
          let match = await Match.findOne({ matchId: matchData.matchId });

          if (match) {
            // Mettre à jour
            Object.assign(match, matchData);
            match.scrapedAt = new Date();
            await match.save();
          } else {
            // Créer un nouveau match
            match = await Match.create({
              ...matchData,
              season: '2024/2025',
              source: 'uefa',
              scrapedAt: new Date()
            });
          }

          savedMatches.push(match);
          logger.info(`💾 Saved match: ${match.homeTeam} vs ${match.awayTeam}`);

        } catch (error) {
          logger.error(`Failed to save match ${matchData.matchId}:`, error);
        }
      }

      return savedMatches;

    } catch (error) {
      logger.error('Failed to scrape matches:', error);
      return [];
    }
  }

  /**
   * Scraper les classements
   */
  async scrapeStandings() {
    try {
      const standingsData = await this.scraper.scrapeStandings();
      
      // Sauvegarder dans AIKnowledge
      await AIKnowledge.create({
        type: 'historical_data',
        sourceType: 'uefa',
        rawData: standingsData,
        processedData: {
          summary: `Classement UCL - Saison ${standingsData.season}`,
          statistics: {
            standings: standingsData.standings
          }
        },
        season: standingsData.season,
        confidence: 1.0,
        scrapedAt: new Date()
      });

      logger.info(`✅ Standings saved for season ${standingsData.season}`);

    } catch (error) {
      logger.error('Failed to scrape standings:', error);
      throw error;
    }
  }

  /**
   * Analyser les matchs récents avec l'IA
   */
  async analyzeRecentMatches() {
    try {
      // Récupérer les matchs sans analyse IA
      const matches = await Match.find({
        aiAnalysis: { $exists: false },
        status: { $in: ['scheduled', 'live', 'finished'] }
      })
        .sort({ kickoff: -1 })
        .limit(10);

      let analyzedCount = 0;

      for (const match of matches) {
        try {
          logger.info(`🤖 Analyzing: ${match.homeTeam} vs ${match.awayTeam}`);

          // Analyser avec l'IA
          const analysis = await this.agent.processMatchData({
            matchId: match.matchId,
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
            date: match.date,
            venue: match.venue,
            statistics: match.statistics,
            events: match.events
          });

          // Sauvegarder l'analyse
          const aiKnowledge = await AIKnowledge.create({
            type: 'match_analysis',
            sourceType: 'ai_generated',
            rawData: match.toObject(),
            processedData: analysis,
            relatedMatches: [match._id],
            season: match.season,
            confidence: analysis.prediction?.confidence || 0.5,
            scrapedAt: new Date()
          });

          // Lier l'analyse au match
          match.aiAnalysis = aiKnowledge._id;
          await match.save();

          analyzedCount++;
          logger.info(`✅ Analysis saved for match ${match.matchId}`);

          // Petit délai pour ne pas surcharger Ollama
          await new Promise(resolve => setTimeout(resolve, 2000));

        } catch (error) {
          logger.error(`Failed to analyze match ${match.matchId}:`, error);
        }
      }

      return analyzedCount;

    } catch (error) {
      logger.error('Failed to analyze matches:', error);
      return 0;
    }
  }

  /**
   * Nettoyer les données expirées
   */
  async cleanupExpiredData() {
    try {
      const deletedCount = await AIKnowledge.cleanExpired();
      
      if (deletedCount > 0) {
        logger.info(`🧹 Cleaned ${deletedCount} expired records`);
      }

    } catch (error) {
      logger.error('Failed to cleanup expired data:', error);
    }
  }

  /**
   * Déclencher une synchronisation manuelle
   */
  async triggerManualSync() {
    try {
      logger.info('🔄 Triggering manual sync...');
      
      await this.queue.add('full-sync', {
        timestamp: new Date(),
        type: 'manual'
      }, {
        priority: 1 // Haute priorité
      });
      
      logger.info('✅ Manual sync job added to queue');
      
    } catch (error) {
      logger.error('Failed to trigger manual sync:', error);
      throw error;
    }
  }

  /**
   * Obtenir les statistiques de la queue
   */
  async getQueueStats() {
    try {
      const [waiting, active, completed, failed] = await Promise.all([
        this.queue.getWaitingCount(),
        this.queue.getActiveCount(),
        this.queue.getCompletedCount(),
        this.queue.getFailedCount()
      ]);

      return {
        waiting,
        active,
        completed,
        failed,
        total: waiting + active + completed + failed
      };

    } catch (error) {
      logger.error('Failed to get queue stats:', error);
      return null;
    }
  }

  /**
   * Arrêter le job
   */
  async stop() {
    logger.info('🛑 Stopping AI Sync Job...');

    if (this.cronJob) {
      this.cronJob.stop();
    }

    // Arrêter les workers
    for (const worker of this.workers) {
      await worker.close();
    }

    // Fermer la connexion Redis
    await this.connection.quit();
    
    // Fermer le scraper
    await this.scraper.closeBrowser();

    this.isRunning = false;
    logger.info('✅ AI Sync Job stopped');
  }

  /**
   * Vérifier la santé du job
   */
  async healthCheck() {
    try {
      const queueStats = await this.getQueueStats();
      const scraperHealth = await this.scraper.healthCheck();
      const agentHealth = await this.agent.healthCheck();

      return {
        status: this.isRunning ? 'running' : 'stopped',
        queue: queueStats,
        scraper: scraperHealth,
        agent: agentHealth
      };

    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message
      };
    }
  }
}

export default AISyncJob;
