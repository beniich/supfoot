import { Ollama } from 'ollama';
import { QdrantClient } from '@qdrant/js-client-rest';
import logger from '../utils/logger.js';

/**
 * 🤖 Agent IA pour la Ligue des Champions
 * Utilise Ollama (gratuit, local) au lieu d'OpenAI
 */
class ChampionsLeagueAgent {
  constructor() {
    // LLM local gratuit
    this.ollama = new Ollama({
      host: process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
    });
    
    this.model = process.env.OLLAMA_MODEL || 'llama3.1';
    
    // Vector DB pour recherche sémantique
    this.qdrant = new QdrantClient({
      url: process.env.QDRANT_URL || 'http://localhost:6333'
    });
    
    this.collectionName = process.env.QDRANT_COLLECTION || 'ucl_knowledge';
    
    this.systemPrompt = `Tu es un expert en Ligue des Champions UEFA avec une connaissance approfondie du football européen.

Tes responsabilités:
1. Analyser les données de matchs, classements et statistiques
2. Extraire les insights tactiques et techniques
3. Identifier les tendances et patterns
4. Générer des prédictions basées sur l'historique
5. Formater les données en JSON structuré

Règles importantes:
- Sois précis et factuel
- Base-toi uniquement sur les données fournies
- Indique un niveau de confiance pour tes prédictions
- Utilise un ton professionnel mais accessible
- Structure toujours ta réponse en JSON valide

Format de sortie JSON attendu:
{
  "summary": "Résumé en 2-3 phrases",
  "keyInsights": ["Insight 1", "Insight 2", "..."],
  "tacticalAnalysis": {
    "formation": "4-3-3",
    "strengths": ["..."],
    "weaknesses": ["..."]
  },
  "keyPlayers": [
    {"name": "...", "role": "...", "impact": "..."}
  ],
  "prediction": {
    "outcome": "home_win | draw | away_win",
    "confidence": 0.75,
    "reasoning": "..."
  }
}`;
  }

  /**
   * Initialiser la collection Qdrant pour les embeddings
   */
  async initialize() {
    try {
      // Vérifier si la collection existe
      const collections = await this.qdrant.getCollections();
      const exists = collections.collections.some(c => c.name === this.collectionName);
      
      if (!exists) {
        logger.info(`Creating Qdrant collection: ${this.collectionName}`);
        
        await this.qdrant.createCollection(this.collectionName, {
          vectors: {
            size: 4096, // Ollama llama3.1 embedding size
            distance: 'Cosine'
          }
        });
        
        logger.info('✅ Qdrant collection created successfully');
      }
    } catch (error) {
      logger.error('Failed to initialize Qdrant:', error);
      throw error;
    }
  }

  /**
   * Générer un embedding avec Ollama
   */
  async generateEmbedding(text) {
    try {
      const response = await this.ollama.embeddings({
        model: this.model,
        prompt: text
      });
      
      return response.embedding;
    } catch (error) {
      logger.error('Failed to generate embedding:', error);
      throw error;
    }
  }

  /**
   * Recherche sémantique dans la base vectorielle
   */
  async searchKnowledge(query, limit = 5) {
    try {
      const queryEmbedding = await this.generateEmbedding(query);
      
      const results = await this.qdrant.search(this.collectionName, {
        vector: queryEmbedding,
        limit,
        with_payload: true
      });
      
      return results.map(r => ({
        score: r.score,
        ...r.payload
      }));
    } catch (error) {
      logger.error('Failed to search knowledge:', error);
      return [];
    }
  }

  /**
   * Analyser les données d'un match avec l'IA
   */
  async processMatchData(matchData) {
    try {
      logger.info(`Processing match: ${matchData.homeTeam} vs ${matchData.awayTeam}`);
      
      // 1. Rechercher du contexte pertinent
      const context = await this.searchKnowledge(
        `${matchData.homeTeam} ${matchData.awayTeam} historique confrontations`
      );
      
      // 2. Construire le prompt avec contexte
      const userPrompt = `Analyse ce match de Ligue des Champions:

📊 DONNÉES DU MATCH:
${JSON.stringify(matchData, null, 2)}

📚 CONTEXTE HISTORIQUE:
${context.length > 0 ? JSON.stringify(context, null, 2) : 'Aucune donnée historique disponible'}

Fournis une analyse complète au format JSON avec:
- Un résumé concis
- Les insights tactiques clés
- L'analyse des forces/faiblesses
- Les joueurs décisifs potentiels
- Une prédiction avec niveau de confiance

Réponds UNIQUEMENT avec le JSON, sans texte additionnel.`;

      // 3. Appeler Ollama
      const response = await this.ollama.generate({
        model: this.model,
        prompt: userPrompt,
        system: this.systemPrompt,
        options: {
          temperature: parseFloat(process.env.OLLAMA_TEMPERATURE) || 0.7,
          num_predict: parseInt(process.env.OLLAMA_MAX_TOKENS) || 2000
        }
      });
      
      // 4. Parser la réponse JSON
      const aiResponse = this.parseJSONResponse(response.response);
      
      // 5. Sauvegarder dans Qdrant pour future référence
      await this.saveKnowledge({
        type: 'match_analysis',
        matchData,
        analysis: aiResponse,
        timestamp: new Date()
      });
      
      logger.info('✅ Match analysis completed');
      return aiResponse;
      
    } catch (error) {
      logger.error('Failed to process match data:', error);
      throw error;
    }
  }

  /**
   * Générer un résumé de saison
   */
  async generateSeasonSummary(season, teamName = null) {
    try {
      const query = teamName 
        ? `${teamName} saison ${season} Ligue des Champions`
        : `saison ${season} Ligue des Champions résumé`;
      
      const context = await this.searchKnowledge(query, 10);
      
      const prompt = `Génère un résumé complet de la saison ${season} de la Ligue des Champions${teamName ? ` pour ${teamName}` : ''}.

📚 DONNÉES DISPONIBLES:
${JSON.stringify(context, null, 2)}

Format JSON attendu:
{
  "season": "${season}",
  "team": "${teamName || 'all'}",
  "summary": "Résumé narratif de 3-4 paragraphes",
  "keyMoments": ["Moment 1", "Moment 2", "..."],
  "topPerformers": [
    {"name": "...", "team": "...", "achievement": "..."}
  ],
  "statistics": {
    "totalMatches": 0,
    "totalGoals": 0,
    "topScorer": "..."
  }
}`;

      const response = await this.ollama.generate({
        model: this.model,
        prompt,
        system: this.systemPrompt
      });
      
      return this.parseJSONResponse(response.response);
      
    } catch (error) {
      logger.error('Failed to generate season summary:', error);
      throw error;
    }
  }

  /**
   * Prédire l'issue d'un match
   */
  async predictMatchOutcome(team1, team2, matchContext = {}) {
    try {
      // Récupérer l'historique des confrontations
      const h2h = await this.searchKnowledge(
        `${team1} vs ${team2} historique confrontations résultats`
      );
      
      const prompt = `Prédis l'issue du match ${team1} vs ${team2} en Ligue des Champions.

📊 CONTEXTE:
${JSON.stringify(matchContext, null, 2)}

📚 HISTORIQUE:
${JSON.stringify(h2h, null, 2)}

Format JSON:
{
  "prediction": "home_win | draw | away_win",
  "confidence": 0.75,
  "probabilities": {
    "homeWin": 0.50,
    "draw": 0.25,
    "awayWin": 0.25
  },
  "keyFactors": ["Facteur 1", "Facteur 2", "..."],
  "reasoning": "Explication détaillée"
}`;

      const response = await this.ollama.generate({
        model: this.model,
        prompt,
        system: this.systemPrompt
      });
      
      return this.parseJSONResponse(response.response);
      
    } catch (error) {
      logger.error('Failed to predict match outcome:', error);
      throw error;
    }
  }

  /**
   * Chat conversationnel avec l'agent
   */
  async chat(userMessage, conversationHistory = []) {
    try {
      // Rechercher du contexte pertinent
      const relevantContext = await this.searchKnowledge(userMessage, 3);
      
      const messages = [
        ...conversationHistory,
        {
          role: 'user',
          content: `${userMessage}

${relevantContext.length > 0 ? `\n📚 Contexte pertinent:\n${JSON.stringify(relevantContext, null, 2)}` : ''}`
        }
      ];
      
      const prompt = messages.map(m => `${m.role}: ${m.content}`).join('\n\n');
      
      const response = await this.ollama.generate({
        model: this.model,
        prompt,
        system: this.systemPrompt
      });
      
      return {
        message: response.response,
        sources: relevantContext
      };
      
    } catch (error) {
      logger.error('Chat failed:', error);
      throw error;
    }
  }

  /**
   * Sauvegarder de la connaissance dans Qdrant
   */
  async saveKnowledge(knowledge) {
    try {
      const id = `${knowledge.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Créer un texte pour l'embedding
      const embeddingText = knowledge.type === 'match_analysis'
        ? `${knowledge.matchData.homeTeam} vs ${knowledge.matchData.awayTeam} ${JSON.stringify(knowledge.analysis)}`
        : JSON.stringify(knowledge);
      
      const embedding = await this.generateEmbedding(embeddingText);
      
      await this.qdrant.upsert(this.collectionName, {
        points: [{
          id,
          vector: embedding,
          payload: knowledge
        }]
      });
      
      logger.info(`✅ Knowledge saved: ${id}`);
      
    } catch (error) {
      logger.error('Failed to save knowledge:', error);
    }
  }

  /**
   * Parser la réponse JSON de l'IA
   */
  parseJSONResponse(responseText) {
    try {
      // Nettoyer la réponse (enlever markdown, backticks, etc.)
      let cleaned = responseText.trim();
      
      // Enlever les blocs de code markdown
      cleaned = cleaned.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      
      // Trouver le premier { et le dernier }
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleaned = cleaned.substring(firstBrace, lastBrace + 1);
      }
      
      return JSON.parse(cleaned);
      
    } catch (error) {
      logger.error('Failed to parse JSON response:', error);
      logger.debug('Raw response:', responseText);
      
      // Fallback: retourner un objet minimal
      return {
        summary: responseText.substring(0, 200),
        error: 'Failed to parse AI response',
        rawResponse: responseText
      };
    }
  }

  /**
   * Vérifier la santé du service
   */
  async healthCheck() {
    try {
      // Tester Ollama
      const ollamaTest = await this.ollama.generate({
        model: this.model,
        prompt: 'Hello',
        options: { num_predict: 10 }
      });
      
      // Tester Qdrant
      const qdrantTest = await this.qdrant.getCollections();
      
      return {
        status: 'healthy',
        ollama: !!ollamaTest.response,
        qdrant: qdrantTest.collections.length >= 0,
        model: this.model
      };
      
    } catch (error) {
      logger.error('Health check failed:', error);
      return {
        status: 'unhealthy',
        error: error.message
      };
    }
  }
}

export default ChampionsLeagueAgent;
