import mongoose from 'mongoose';

/**
 * 💾 Schéma pour stocker les connaissances générées par l'IA
 */
const AIKnowledgeSchema = new mongoose.Schema({
  // Type de connaissance
  type: {
    type: String,
    enum: [
      'match_analysis',      // Analyse d'un match
      'player_profile',      // Profil de joueur
      'season_summary',      // Résumé de saison
      'tactical_insight',    // Insight tactique
      'prediction',          // Prédiction
      'team_comparison',     // Comparaison d'équipes
      'historical_data'      // Données historiques
    ],
    required: true,
    index: true
  },

  // Source des données
  sourceType: {
    type: String,
    enum: ['uefa', 'bein', 'transfermarkt', 'web', 'ai_generated', 'user_input'],
    default: 'ai_generated'
  },

  sourceUrl: {
    type: String,
    trim: true
  },

  // Données brutes (input)
  rawData: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },

  // Données traitées par l'IA (output)
  processedData: {
    // Résumé textuel
    summary: {
      type: String,
      required: true
    },

    // Insights clés
    insights: [{
      type: String
    }],

    // Statistiques extraites
    statistics: {
      type: mongoose.Schema.Types.Mixed
    },

    // Prédictions
    prediction: {
      outcome: String,
      confidence: {
        type: Number,
        min: 0,
        max: 1
      },
      probabilities: {
        type: mongoose.Schema.Types.Mixed
      },
      reasoning: String
    },

    // Analyse tactique
    tacticalAnalysis: {
      formation: String,
      strengths: [String],
      weaknesses: [String],
      keyPlayers: [{
        name: String,
        role: String,
        impact: String
      }]
    },

    // Données additionnelles
    metadata: {
      type: mongoose.Schema.Types.Mixed
    }
  },

  // Niveau de confiance de l'IA (0-1)
  confidence: {
    type: Number,
    min: 0,
    max: 1,
    default: 0.5
  },

  // Relations avec d'autres entités
  relatedMatches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  }],

  relatedTeams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],

  relatedPlayers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],

  // Saison
  season: {
    type: String,
    index: true
  },

  // Competition
  competition: {
    type: String,
    default: 'UEFA Champions League',
    index: true
  },

  // Embeddings vectoriels (pour Qdrant)
  embeddingId: {
    type: String,
    unique: true,
    sparse: true
  },

  // Statut de la validation
  validated: {
    type: Boolean,
    default: false
  },

  validatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  validatedAt: Date,

  // Feedback utilisateur
  userFeedback: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Métriques d'utilisation
  viewCount: {
    type: Number,
    default: 0
  },

  shareCount: {
    type: Number,
    default: 0
  },

  // Timestamp
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },

  lastUpdated: {
    type: Date,
    default: Date.now
  },

  // Expiration (pour les données temporaires)
  expiresAt: {
    type: Date,
    index: true
  }
}, {
  timestamps: true,
  collection: 'ai_knowledge'
});

// Index composés pour améliorer les performances
AIKnowledgeSchema.index({ type: 1, season: 1, createdAt: -1 });
AIKnowledgeSchema.index({ type: 1, competition: 1, createdAt: -1 });
AIKnowledgeSchema.index({ relatedMatches: 1, type: 1 });
AIKnowledgeSchema.index({ relatedTeams: 1, type: 1 });
AIKnowledgeSchema.index({ 'processedData.prediction.confidence': -1 });

// Index text search pour recherche par mots-clés
AIKnowledgeSchema.index({ 
  'processedData.summary': 'text',
  'processedData.insights': 'text'
});

// Middleware: mettre à jour lastUpdated
AIKnowledgeSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Méthodes d'instance
AIKnowledgeSchema.methods = {
  /**
   * Ajouter un feedback utilisateur
   */
  addFeedback(userId, rating, comment = '') {
    this.userFeedback.push({
      userId,
      rating,
      comment,
      createdAt: new Date()
    });
    return this.save();
  },

  /**
   * Incrémenter le compteur de vues
   */
  incrementViewCount() {
    this.viewCount += 1;
    return this.save();
  },

  /**
   * Valider la connaissance
   */
  validate(validatedBy) {
    this.validated = true;
    this.validatedBy = validatedBy;
    this.validatedAt = new Date();
    return this.save();
  },

  /**
   * Calculer le rating moyen
   */
  getAverageRating() {
    if (this.userFeedback.length === 0) return 0;
    
    const sum = this.userFeedback.reduce((acc, fb) => acc + fb.rating, 0);
    return sum / this.userFeedback.length;
  }
};

// Méthodes statiques
AIKnowledgeSchema.statics = {
  /**
   * Trouver les connaissances récentes par type
   */
  async findRecentByType(type, limit = 10) {
    return this.find({ type })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('relatedMatches relatedTeams relatedPlayers')
      .exec();
  },

  /**
   * Rechercher par équipe
   */
  async findByTeam(teamId, type = null) {
    const query = { relatedTeams: teamId };
    if (type) query.type = type;
    
    return this.find(query)
      .sort({ createdAt: -1 })
      .populate('relatedMatches relatedTeams')
      .exec();
  },

  /**
   * Rechercher par match
   */
  async findByMatch(matchId) {
    return this.find({ relatedMatches: matchId })
      .sort({ createdAt: -1 })
      .populate('relatedMatches')
      .exec();
  },

  /**
   * Statistiques globales
   */
  async getStats() {
    const stats = await this.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          avgConfidence: { $avg: '$confidence' },
          totalViews: { $sum: '$viewCount' }
        }
      }
    ]);
    
    return stats;
  },

  /**
   * Nettoyer les connaissances expirées
   */
  async cleanExpired() {
    const result = await this.deleteMany({
      expiresAt: { $lt: new Date() }
    });
    
    return result.deletedCount;
  }
};

const AIKnowledge = mongoose.model('AIKnowledge', AIKnowledgeSchema);

export default AIKnowledge;
