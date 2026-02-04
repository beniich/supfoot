# 🤖 AI Agent Integration Guide - FootballHub+

## Vue d'Ensemble

FootballHub+ intègre maintenant un **agent IA gratuit et local** basé sur:
- **Ollama** (Llama 3.1) - LLM local, 0€/mois
- **Qdrant** - Vector database pour recherche sémantique
- **Puppeteer** - Web scraping UEFA & beIN Sports
- **BullMQ** - Job queue pour synchronisation automatique

---

## 🚀 Installation Rapide

### 1. Installer Ollama (LLM Local)

**Windows:**
```powershell
# Télécharger depuis ollama.com/download
# Ou avec winget:
winget install Ollama.Ollama
```

**Vérifier l'installation:**
```bash
ollama --version
```

**Télécharger le modèle Llama 3.1:**
```bash
ollama pull llama3.1
```

---

### 2. Démarrer Redis + Qdrant avec Docker

```bash
cd backend
docker-compose up -d
```

**Services démarrés:**
- Redis → `localhost:6379`
- Qdrant → `localhost:6333` (Dashboard: http://localhost:6333/dashboard)

---

### 3. Installer les Dépendances Backend

```bash
cd backend
npm install
```

**Nouvelles dépendances ajoutées:**
```json
{
  "ollama": "^0.5.0",           // Interface Ollama
  "langchain": "^0.1.0",        // Framework AI
  "@qdrant/js-client-rest": "^1.7.0",  // Vector DB
  "puppeteer": "^21.6.1",       // Web scraping
  "bullmq": "^5.0.0"            // Job queue
}
```

---

### 4. Configuration (.env)

Les variables suivantes ont été ajoutées à `.env`:

```env
# AI Agent Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1
OLLAMA_TEMPERATURE=0.7

# Qdrant Vector DB
QDRANT_URL=http://localhost:6333
QDRANT_COLLECTION=ucl_knowledge

# Features
AI_AGENT_ENABLED=true
VECTOR_SEARCH_ENABLED=true
SCRAPING_INTERVAL_MINUTES=60
```

---

## 📁 Fichiers Intégrés

### Backend (`/backend/src/`)

```
backend/src/
├── services/
│   └── aiAgent.js          ✅ Agent IA principal (Ollama)
├── scrapers/
│   └── uefaScraper.js      ✅ Scraper UEFA.com
├── jobs/
│   └── aiSyncJob.js        ✅ CRON sync automatique
├── models/
│   └── AIKnowledge.js      ✅ Schema MongoDB pour connaissances
└── routes/
    └── ai.js               ✅ API endpoints IA
```

### Frontend (`/web/src/`)

```
web/src/
└── components/
    └── ai/
        └── AIInsightsCard.tsx  ✅ Widget insights IA
```

### Documentation (`/backend/docs/`)

```
backend/docs/
├── README.md               ✅ Guide principal
├── API.md                  ✅ Documentation API
├── INSTALLATION.md         ✅ Installation détaillée
├── PROJECT_OVERVIEW.md     ✅ Vue d'ensemble du projet
└── QUICKSTART.md           ✅ Démarrage rapide
```

---

## 🎯 Fonctionnalités de l'Agent IA

### 1. Analyse de Match
```javascript
POST /api/ai/analyze-match
{
  "homeTeam": "Real Madrid",
  "awayTeam": "Bayern Munich",
  "competition": "Champions League",
  "season": "2025-26"
}

// Réponse:
{
  "summary": "Match équilibré avec léger avantage domicile...",
  "keyInsights": ["Formation 4-3-3 vs 4-2-3-1", ".."],
  "prediction": {
    "outcome": "home_win",
    "confidence": 0.72,
    "probabilities": {
      "homeWin": 0.45,
      "draw": 0.30,
      "awayWin": 0.25
    }
  },
  "keyPlayers": [
    { "name": "Vinicius Jr", "role": "Ailier gauche", "impact": "Décisif" }
  ]
}
```

### 2. Chatbot Conversationnel
```javascript
POST /api/ai/chat
{
  "message": "Qui a remporté la Ligue des Champions en 2023?"
}

// Réponse:
{
  "message": "Manchester City a remporté la Ligue des Champions 2023...",
  "sources": [...]
}
```

### 3. Prédiction de Résultat
```javascript
POST /api/ai/predict
{
  "team1": "PSG",
  "team2": "Barcelona"
}
```

### 4. Résumé de Saison
```javascript
GET /api/ai/season-summary/2024-25?team=Real Madrid
```

---

## 🔄 Synchronisation Automatique

Le job CRON s'exécute **toutes les heures** (configurable via `SCRAPING_INTERVAL_MINUTES`):

1. Scrape UEFA.com + beIN Sports
2. Analyse avec Ollama
3. Génère insights tactiques
4. Enregistre dans MongoDB + Qdrant
5. Notifie via WebSocket

---

## 🖥️ Utilisation UI

### Intégrer le Widget AI Insights

```typescript
// Dans n'importe quelle page de match
import AIInsightsCard from '@/components/ai/AIInsightsCard';

<AIInsightsCard matchId="match_123" />
```

Le composant affichera:
- ✅ Résumé IA du match
- ✅ Insights tactiques
- ✅ Prédiction avec % de confiance
- ✅ Joueurs clés identifiés

---

## 🧪 Tester l'Agent IA

### 1. Démarrer les Services

```bash
# Terminal 1: Redis + Qdrant
cd backend
docker-compose up

# Terminal 2: Ollama (si pas démarré auto)
ollama serve

# Terminal 3: Backend
npm run dev
```

### 2. Health Check

```bash
curl http://localhost:5000/api/ai/health
```

**Réponse attendue:**
```json
{
  "status": "healthy",
  "ollama": true,
  "qdrant": true,
  "model": "llama3.1"
}
```

### 3. Test Simple

```bash
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'
```

---

## 📊 Dashboard Admin

Accédez aux métriques IA via:
```
http://localhost:3000/admin/ai-monitor
```

**Métriques affichées:**
- Nombre total d'insights générés
- Appels API IA aujourd'hui
- Taux de précision des prédictions
- Graphiques d'utilisation

---

## 🐳 Docker Compose Services

```yaml
services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"  # REST API
      - "6334:6334"  # gRPC (optionnel)
    volumes:
      - qdrant_data:/qdrant/storage
```

---

## 💡 Exemples d'Utilisation

### Exemple 1: Analyse Automatique Pré-Match

```javascript
// backend/src/jobs/preMatchAnalysis.js
import ChampionsLeagueAgent from '../services/aiAgent.js';

const agent = new ChampionsLeagueAgent();

// Analyser tous les matchs de demain
const upcomingMatches = await Match.find({
  date: { $gte: tomorrow }
});

for (const match of upcomingMatches) {
  const analysis = await agent.processMatchData(match);
  await AIKnowledge.create({
    type: 'pre_match_analysis',
    relatedMatches: [match._id],
    processedData: analysis
  });
}
```

### Exemple 2: Notification Insight Personnalisée

```javascript
// Si un insight important est détecté
if (analysis.prediction.confidence > 0.85) {
  // Notifier les utilisateurs via WebSocket
  io.to(`match_${match._id}`).emit('ai_insight', {
    type: 'high_confidence_prediction',
    data: analysis
  });
}
```

---

## 🔧 Troubleshooting

### Problème: Ollama ne répond pas

```bash
# Vérifier si Ollama tourne
curl http://localhost:11434/api/tags

# Redémarrer Ollama
# Windows: Services → Ollama → Restart
# Linux: systemctl restart ollama
```

### Problème: Qdrant Connection Error

```bash
# Vérifier si le container tourne
docker ps | grep qdrant

# Redémarrer
docker-compose restart qdrant

# Logs
docker-compose logs qdrant
```

### Problème: Scraping Bloqué

```bash
# Vérifier le User-Agent dans .env
USER_AGENT=Mozilla/5.0 (compatible; FootballHub-Bot/1.0)

# Ajouter des délais entre requêtes
# Modifier dans uefaScraper.js
await page.waitForTimeout(2000);
```

---

## 📈 Performance & Optimisation

### Temps de Réponse Typiques

| Action | Temps Moyen |
|--------|-------------|
| Analyse match | 3-5s |
| Chat simple | 1-2s |
| Recherche vectorielle | <100ms |
| Génération résumé saison | 8-12s |

### Optimisations Appliquées

1. **Cache Redis** - Répons

es identiques (TTL: 1h)
2. **Batch Processing** - Multiple matchs en parallèle
3. **Embeddings réutilisables** - Pas de recalcul
4. **Queue BullMQ** - Évite surcharge serveur

---

## 🌐 Déploiement Production

### Option 1: VPS avec Docker

```bash
# Sur votre VPS (Hetzner, DigitalOcean, etc.)
docker-compose -f docker-compose.prod.yml up -d
```

### Option 2: GPU Cloud (pour meilleure performance)

- **RunPod** - GPU à partir de $0.20/h
- **Vast.ai** - GPU à partir de $0.10/h
- **Lambda Labs** - GPU dédié à partir de $0.50/h

### Variables d'Environment Production

```env
NODE_ENV=production
OLLAMA_BASE_URL=http://ollama:11434  # Si Docker network
QDRANT_URL=http://qdrant:6333
```

---

## 💰 Coûts Totaux

| Service | Coût/mois |
|---------|-----------|
| Ollama (local) | **0€** |
| Qdrant (self-hosted) | **0€** |
| Redis (Docker) | **0€** |
| MongoDB Atlas (Free Tier) | **0€** |
| **TOTAL** | **0€** |

**Alternative Cloud:**
- OpenAI API: ~$50-100/mois
- Pinecone: ~$70/mois
- **Économies: ~$120-170/mois** 🎉

---

## 📚 Resources Utiles

- [Ollama Documentation](https://ollama.com/docs)
- [Qdrant Guide](https://qdrant.tech/documentation/)
- [LangChain.js](https://js.langchain.com/)
- [Puppeteer Best Practices](https://pptr.dev/)

---

## 🎓 Prochaines Étapes

1. ✅ Installer Ollama + télécharger llama3.1
2. ✅ Lancer Docker Compose
3. ✅ Installer dépendances backend
4. ✅ Tester l'endpoint `/api/ai/health`
5. ⏳ Configurer le scraping UEFA
6. ⏳ Intégrer le widget UI
7. ⏳ Déployer en production

---

## 🤝 Support

Pour toute question:
- Check `backend/docs/API.md` pour la doc API complète
- Logs: `backend/logs/combined.log`
- Issues: Créer un ticket GitHub

---

**L'agent IA est maintenant prêt à propulser FootballHub+ vers le futur ! 🚀⚽**
