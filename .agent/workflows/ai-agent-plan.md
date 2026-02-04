# 🤖 Plan d'Intégration Agent IA - Ligue des Champions

## 🎯 Objectif
Créer un agent IA capable d'importer, transformer et afficher automatiquement les informations détaillées de la Ligue des Champions depuis beIN Sports, UEFA et autres sources web.

---

## 📋 Phase 1: Architecture & Configuration (Semaine 1)

### 1.1 Choix de la Stack IA
- **LLM Provider**: OpenAI GPT-4 ou Anthropic Claude
- **Framework d'Agent**: LangChain ou CrewAI
- **Web Scraping**: Puppeteer + Cheerio
- **Vector Database**: Pinecone ou Qdrant (pour la mémoire sémantique)
- **Orchestration**: Bull Queue (jobs Redis)

### 1.2 Configuration Backend
```bash
npm install langchain openai cheerio puppeteer @pinecone-database/pinecone ioredis
```

**Fichiers à créer:**
- `backend/src/services/aiAgent.js` - Service principal de l'agent
- `backend/src/scrapers/uefaScraper.js` - Scraper UEFA officiel
- `backend/src/scrapers/beinSportsScraper.js` - Scraper beIN Sports
- `backend/src/jobs/aiSyncJob.js` - Job CRON pour synchronisation auto
- `backend/src/models/AIKnowledge.js` - Modèle pour stocker les connaissances

---

## 📡 Phase 2: Scraping & Collecte de Données (Semaine 2)

### 2.1 Sources de Données
1. **UEFA.com**
   - Calendrier des matchs
   - Classements
   - Statistiques des joueurs
   - Historique des rencontres

2. **beIN Sports**
   - Analyses d'experts
   - Résumés vidéo (métadonnées)
   - Actualités

3. **Wikipedia & Transfermarkt**
   - Informations contextuelles
   - Valeurs des joueurs

### 2.2 Architecture du Scraper
```javascript
// backend/src/scrapers/uefaScraper.js
class UEFAScraper {
  async scrapeStandings(season, competition) {
    // Puppeteer pour pages dynamiques
  }
  
  async scrapeMatchDetails(matchId) {
    // Cheerio pour HTML statique
  }
  
  async scrapePlayerStats(playerId) {
    // Extraction structurée
  }
}
```

---

## 🧠 Phase 3: Développement de l'Agent IA (Semaine 3-4)

### 3.1 Prompt Engineering
```javascript
const systemPrompt = `
Tu es un expert en Ligue des Champions UEFA.
Ta mission:
1. Analyser les données brutes de matches, standings, news
2. Extraire les informations clés
3. Formater les données en JSON structuré
4. Générer des insights tactiques
5. Détecter les tendances et patterns

Format de sortie attendu:
{
  "match": {...},
  "insights": [...],
  "keyPlayers": [...],
  "predictions": {...}
}
`;
```

### 3.2 Architecture Agent
```javascript
// backend/src/services/aiAgent.js
class ChampionsLeagueAgent {
  constructor() {
    this.llm = new ChatOpenAI({ model: "gpt-4-turbo" });
    this.memory = new VectorStoreMemory();
    this.tools = [
      new WebSearchTool(),
      new DatabaseTool(),
      new StatisticsTool()
    ];
  }

  async processMatchData(rawData) {
    // 1. Enrichissement avec contexte
    const context = await this.memory.search(rawData.teams);
    
    // 2. Génération d'insights
    const insights = await this.llm.invoke({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify(rawData) }
      ]
    });
    
    // 3. Validation et structuration
    return this.validateAndFormat(insights);
  }

  async generateSeasonSummary(season) {
    // Synthèse automatique de la saison
  }

  async predictMatchOutcome(team1, team2) {
    // Prédictions basées sur l'historique
  }
}
```

### 3.3 Outils Spécialisés
```javascript
// Tools pour l'agent
const tools = [
  {
    name: "fetch_live_score",
    description: "Récupère les scores en temps réel",
    func: async (matchId) => await fetchFromUEFA(matchId)
  },
  {
    name: "analyze_tactics",
    description: "Analyse tactique d'un match",
    func: async (matchData) => await analyzeTactics(matchData)
  },
  {
    name: "compare_teams",
    description: "Compare les statistiques de deux équipes",
    func: async (team1, team2) => await compareStats(team1, team2)
  }
];
```

---

## 💾 Phase 4: Stockage Intelligent (Semaine 4)

### 4.1 Structure de Données
```javascript
// backend/src/models/AIKnowledge.js
const AIKnowledgeSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['match_analysis', 'player_profile', 'season_summary', 'tactical_insight'],
    required: true 
  },
  sourceType: { type: String, enum: ['uefa', 'bein', 'web', 'generated'] },
  sourceUrl: String,
  rawData: Object,
  processedData: {
    summary: String,
    insights: [String],
    statistics: Object,
    predictions: Object
  },
  embeddings: [Number], // Vector embeddings pour recherche sémantique
  confidence: Number,
  relatedMatches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
  relatedTeams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  createdAt: { type: Date, default: Date.now },
  lastUpdated: Date
});
```

### 4.2 Indexation Vectorielle
```javascript
// Pinecone pour recherche sémantique
async function indexKnowledge(knowledge) {
  const embedding = await getEmbedding(knowledge.processedData.summary);
  
  await pinecone.index('ucl-knowledge').upsert([{
    id: knowledge._id.toString(),
    values: embedding,
    metadata: {
      type: knowledge.type,
      teams: knowledge.relatedTeams,
      season: knowledge.season
    }
  }]);
}
```

---

## 🔄 Phase 5: Synchronisation Automatique (Semaine 5)

### 5.1 Job CRON
```javascript
// backend/src/jobs/aiSyncJob.js
const aiSyncJob = {
  start: () => {
    // Toutes les 30 minutes
    cron.schedule('*/30 * * * *', async () => {
      try {
        // 1. Scraper les nouvelles données
        const uefaData = await uefaScraper.scrapeLatest();
        const beinData = await beinScraper.scrapeLatest();
        
        // 2. Fusionner et dédupliquer
        const mergedData = mergeSources([uefaData, beinData]);
        
        // 3. Traiter avec l'agent IA
        const agent = new ChampionsLeagueAgent();
        const insights = await agent.processMatchData(mergedData);
        
        // 4. Sauvegarder dans la DB
        await AIKnowledge.create(insights);
        
        // 5. Notifier les utilisateurs (via WebSocket)
        webSocketService.broadcast('ucl_update', insights);
        
        logger.info('✅ AI Sync completed successfully');
      } catch (error) {
        logger.error('❌ AI Sync failed:', error);
      }
    });
  }
};
```

---

## 🎨 Phase 6: Interface Utilisateur (Semaine 6)

### 6.1 Composants React
```typescript
// web/src/components/ai/AIInsightsCard.tsx
export default function AIInsightsCard({ matchId }: { matchId: string }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsights() {
      const res = await apiClient.get(`/ai/insights/match/${matchId}`);
      setInsights(res.data);
      setLoading(false);
    }
    fetchInsights();
  }, [matchId]);

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="bg-ucl-midnight border border-ucl-accent/20 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-ucl-accent" size={20} />
        <h3 className="text-lg font-bold">AI Analysis</h3>
      </div>
      
      <div className="space-y-4">
        {insights.keyPoints.map((point, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-1.5 h-1.5 bg-ucl-accent rounded-full mt-2" />
            <p className="text-sm text-white/80">{point}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white/5 rounded-xl">
        <h4 className="text-xs font-bold text-ucl-accent mb-2">PREDICTION</h4>
        <p className="text-sm">{insights.prediction}</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-ucl-accent to-ucl-blue"
              style={{ width: `${insights.confidence}%` }}
            />
          </div>
          <span className="text-xs font-bold">{insights.confidence}%</span>
        </div>
      </div>
    </div>
  );
}
```

### 6.2 Routes API
```javascript
// backend/src/routes/ai.js
router.get('/ai/insights/match/:matchId', async (req, res) => {
  const insights = await AIKnowledge.findOne({
    type: 'match_analysis',
    relatedMatches: req.params.matchId
  }).sort({ createdAt: -1 });
  
  res.json(insights || { message: 'Processing...' });
});

router.post('/ai/generate/summary', aiAuth, async (req, res) => {
  const agent = new ChampionsLeagueAgent();
  const summary = await agent.generateSeasonSummary(req.body.season);
  res.json(summary);
});

router.get('/ai/chat', async (req, res) => {
  // Chatbot conversationnel
  const agent = new ChampionsLeagueAgent();
  const response = await agent.chat(req.query.message);
  res.json({ response });
});
```

---

## 🔐 Phase 7: Sécurité & Limites (Semaine 7)

### 7.1 Rate Limiting
```javascript
const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requêtes IA par minute
  message: 'Trop de requêtes IA, veuillez patienter'
});

router.use('/ai', aiRateLimiter);
```

### 7.2 Coûts & Optimisation
- **Cache Redis** pour requêtes identiques (TTL: 1h)
- **Embeddings réutilisables** (pas de recalcul)
- **Batch processing** pour réduire les appels API
- **Fallback** sur données statiques si LLM indisponible

---

## 📊 Phase 8: Monitoring & Analytics (Semaine 8)

### 8.1 Métriques
- Nombre de scrapes/jour
- Temps de réponse de l'agent
- Précision des prédictions
- Coûts OpenAI
- Taux d'erreur

### 8.2 Dashboard Admin
```typescript
// web/src/app/admin/ai-monitor/page.tsx
export default function AIMonitorPage() {
  return (
    <div>
      <StatsCard title="Total Insights" value="1,234" />
      <StatsCard title="API Calls Today" value="456" />
      <StatsCard title="Accuracy Rate" value="87%" />
      <LineChart data={aiUsageData} />
    </div>
  );
}
```

---

## 🚀 Déploiement (Semaine 9)

### 9.1 Variables d'Environment
```env
# .env
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=...
AI_AGENT_ENABLED=true
AI_SCRAPING_INTERVAL=30 # minutes
```

### 9.2 Dockerfile
```dockerfile
# Backend avec support Puppeteer
FROM node:20-bookworm-slim
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
```

---

## 💡 Fonctionnalités Avancées (Bonus)

1. **Chatbot Assistant**
   - "Qui a marqué le plus de buts cette saison ?"
   - "Analyse tactique de Real Madrid vs Bayern"

2. **Prédictions de Match**
   - Algorithme ML basé sur historique
   - Affichage en temps réel

3. **Résumés Automatiques**
   - Génération de rapports hebdomadaires
   - Newsletter personnalisée

4. **Alertes Intelligentes**
   - Notification quand un joueur favori joue
   - Alerte sur événements importants

---

## 📅 Timeline Complète

| Semaine | Tâche | Livrable |
|---------|-------|----------|
| 1 | Architecture & Setup | Config + Dependencies |
| 2 | Scrapers | UEFA + beIN Sports scrapers |
| 3-4 | Agent IA | LangChain Agent fonctionnel |
| 4 | Base de données | Schema + Vector DB |
| 5 | CRON Jobs | Sync automatique |
| 6 | UI Frontend | Composants AI Insights |
| 7 | Sécurité | Rate limiting + Auth |
| 8 | Monitoring | Dashboard admin |
| 9 | Déploiement | Production ready |

---

## 🎯 KPIs de Succès

- ✅ 95% de données UCL actualisées
- ✅ <2s temps de réponse agent
- ✅ 80%+ précision des prédictions
- ✅ <$100/mois coûts OpenAI
- ✅ 0 downtime sur scraping

---

## 📚 Ressources

- [LangChain Documentation](https://js.langchain.com/)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Puppeteer Guides](https://pptr.dev/)
- [Pinecone Quickstart](https://docs.pinecone.io/)

---

**Prêt à commencer ?** 🚀
Confirmez et je démarre l'implémentation de la Phase 1 !
