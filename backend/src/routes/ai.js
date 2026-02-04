import express from 'express';
import rateLimit from 'express-rate-limit';
import ChampionsLeagueAgent from '../services/aiAgent.js';
import AIKnowledge from '../models/AIKnowledge.js';
import Match from '../models/Match.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Rate limiter pour les endpoints IA
const aiRateLimiter = rateLimit({
  windowMs: parseInt(process.env.AI_RATE_LIMIT_WINDOW_MS) || 60000, // 1 minute
  max: parseInt(process.env.AI_RATE_LIMIT_MAX_REQUESTS) || 10,
  message: { 
    error: 'Trop de requêtes IA. Veuillez patienter avant de réessayer.',
    retryAfter: 60 
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Instance de l'agent
const agent = new ChampionsLeagueAgent();

/**
 * GET /api/ai/health
 * Vérifier la santé de l'agent IA
 */
router.get('/health', async (req, res) => {
  try {
    const health = await agent.healthCheck();
    
    res.json({
      success: true,
      data: health
    });
    
  } catch (error) {
    logger.error('AI health check failed:', error);
    res.status(500).json({
      success: false,
      error: 'Health check failed'
    });
  }
});

/**
 * GET /api/ai/insights/match/:matchId
 * Obtenir l'analyse IA d'un match
 */
router.get('/insights/match/:matchId', async (req, res) => {
  try {
    const { matchId } = req.params;
    
    logger.info(`Fetching AI insights for match: ${matchId}`);
    
    // Chercher le match
    const match = await Match.findOne({ matchId });
    
    if (!match) {
      return res.status(404).json({
        success: false,
        error: 'Match non trouvé'
      });
    }
    
    // Chercher l'analyse IA existante
    let insights = await AIKnowledge.findOne({
      type: 'match_analysis',
      relatedMatches: match._id
    }).sort({ createdAt: -1 });
    
    if (!insights) {
      return res.json({
        success: true,
        data: null,
        message: 'Analyse en cours de génération...'
      });
    }
    
    // Incrémenter le compteur de vues
    await insights.incrementViewCount();
    
    res.json({
      success: true,
      data: {
        match: match.getSummary(),
        analysis: insights.processedData,
        confidence: insights.confidence,
        generatedAt: insights.createdAt,
        viewCount: insights.viewCount
      }
    });
    
  } catch (error) {
    logger.error('Failed to fetch match insights:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des insights'
    });
  }
});

/**
 * POST /api/ai/analyze/match
 * Analyser un match avec l'IA (manuel)
 */
router.post('/analyze/match', aiRateLimiter, async (req, res) => {
  try {
    const { matchId } = req.body;
    
    if (!matchId) {
      return res.status(400).json({
        success: false,
        error: 'matchId requis'
      });
    }
    
    logger.info(`Manual AI analysis requested for match: ${matchId}`);
    
    const match = await Match.findOne({ matchId });
    
    if (!match) {
      return res.status(404).json({
        success: false,
        error: 'Match non trouvé'
      });
    }
    
    // Générer l'analyse
    const analysis = await agent.processMatchData({
      matchId: match.matchId,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      date: match.date,
      venue: match.venue,
      statistics: match.statistics,
      events: match.events
    });
    
    res.json({
      success: true,
      data: analysis
    });
    
  } catch (error) {
    logger.error('Failed to analyze match:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'analyse du match'
    });
  }
});

/**
 * POST /api/ai/predict
 * Prédire l'issue d'un match
 */
router.post('/predict', aiRateLimiter, async (req, res) => {
  try {
    const { team1, team2, matchContext } = req.body;
    
    if (!team1 || !team2) {
      return res.status(400).json({
        success: false,
        error: 'team1 et team2 requis'
      });
    }
    
    logger.info(`Prediction requested: ${team1} vs ${team2}`);
    
    const prediction = await agent.predictMatchOutcome(team1, team2, matchContext || {});
    
    res.json({
      success: true,
      data: prediction
    });
    
  } catch (error) {
    logger.error('Failed to predict match:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la prédiction'
    });
  }
});

/**
 * POST /api/ai/summary/season
 * Générer un résumé de saison
 */
router.post('/summary/season', aiRateLimiter, async (req, res) => {
  try {
    const { season, teamName } = req.body;
    
    if (!season) {
      return res.status(400).json({
        success: false,
        error: 'season requis'
      });
    }
    
    logger.info(`Season summary requested: ${season}${teamName ? ` for ${teamName}` : ''}`);
    
    const summary = await agent.generateSeasonSummary(season, teamName);
    
    res.json({
      success: true,
      data: summary
    });
    
  } catch (error) {
    logger.error('Failed to generate season summary:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la génération du résumé'
    });
  }
});

/**
 * POST /api/ai/chat
 * Chat conversationnel avec l'agent
 */
router.post('/chat', aiRateLimiter, async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'message requis'
      });
    }
    
    logger.info(`Chat request: ${message.substring(0, 50)}...`);
    
    const response = await agent.chat(message, history || []);
    
    res.json({
      success: true,
      data: response
    });
    
  } catch (error) {
    logger.error('Chat failed:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la conversation'
    });
  }
});

/**
 * GET /api/ai/knowledge/recent
 * Récupérer les connaissances récentes
 */
router.get('/knowledge/recent', async (req, res) => {
  try {
    const { type, limit = 10 } = req.query;
    
    let query = {};
    if (type) query.type = type;
    
    const knowledge = await AIKnowledge.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('relatedMatches relatedTeams')
      .select('-rawData'); // Exclure les données brutes volumineuses
    
    res.json({
      success: true,
      data: knowledge,
      count: knowledge.length
    });
    
  } catch (error) {
    logger.error('Failed to fetch knowledge:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des connaissances'
    });
  }
});

/**
 * GET /api/ai/knowledge/stats
 * Statistiques des connaissances IA
 */
router.get('/knowledge/stats', async (req, res) => {
  try {
    const stats = await AIKnowledge.getStats();
    
    const total = await AIKnowledge.countDocuments();
    const validated = await AIKnowledge.countDocuments({ validated: true });
    
    res.json({
      success: true,
      data: {
        total,
        validated,
        byType: stats
      }
    });
    
  } catch (error) {
    logger.error('Failed to fetch knowledge stats:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des statistiques'
    });
  }
});

/**
 * POST /api/ai/knowledge/:id/feedback
 * Ajouter un feedback sur une connaissance
 */
router.post('/knowledge/:id/feedback', async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: 'rating invalide (1-5)'
      });
    }
    
    const knowledge = await AIKnowledge.findById(id);
    
    if (!knowledge) {
      return res.status(404).json({
        success: false,
        error: 'Connaissance non trouvée'
      });
    }
    
    // Pour l'instant, userId fictif (à remplacer par vrai auth)
    await knowledge.addFeedback(null, rating, comment || '');
    
    res.json({
      success: true,
      data: {
        averageRating: knowledge.getAverageRating(),
        feedbackCount: knowledge.userFeedback.length
      }
    });
    
  } catch (error) {
    logger.error('Failed to add feedback:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'ajout du feedback'
    });
  }
});

/**
 * GET /api/ai/search
 * Recherche sémantique dans les connaissances
 */
router.get('/search', aiRateLimiter, async (req, res) => {
  try {
    const { q, limit = 5 } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Paramètre q requis'
      });
    }
    
    logger.info(`Semantic search: ${q}`);
    
    const results = await agent.searchKnowledge(q, parseInt(limit));
    
    res.json({
      success: true,
      data: results,
      count: results.length
    });
    
  } catch (error) {
    logger.error('Search failed:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la recherche'
    });
  }
});

export default router;
