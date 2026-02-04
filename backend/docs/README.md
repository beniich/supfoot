# 🤖 UCL AI Agent - Champions League Intelligence

Agent IA gratuit pour importer, analyser et prédire les matchs de la Ligue des Champions.

## 🎯 Stack 100% Gratuite

### Backend
- **LLM**: Ollama (Llama 3.1 / Mistral) - Local & Gratuit
- **Vector DB**: Qdrant - Self-hosted gratuit
- **Web Scraping**: Puppeteer + Cheerio
- **Queue**: BullMQ + Redis local
- **Database**: MongoDB (Atlas Free Tier)

### Frontend
- **Framework**: Next.js 14
- **UI**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **Real-time**: Socket.io

## 📦 Installation

### Prérequis
```bash
# Node.js 20+
node --version

# Docker (pour Redis + Qdrant)
docker --version

# Ollama (pour le LLM local)
curl -fsSL https://ollama.com/install.sh | sh
```

### 1️⃣ Backend Setup

```bash
cd backend
npm install

# Démarrer les services Docker
docker-compose up -d

# Télécharger le modèle Llama 3.1
ollama pull llama3.1

# Lancer le backend
npm run dev
```

### 2️⃣ Frontend Setup

```bash
cd web
npm install
npm run dev
```

## 🚀 Fonctionnalités

- ✅ Scraping automatique UEFA + beIN Sports
- ✅ Analyse IA des matchs (local, gratuit)
- ✅ Prédictions basées sur l'historique
- ✅ Insights tactiques générés par IA
- ✅ Dashboard admin en temps réel
- ✅ Recherche sémantique des matchs
- ✅ Notifications WebSocket

## 📊 Coûts

**0€/mois** - Tout est hébergé localement ou sur free tiers !

## 🛠️ Structure du Projet

```
ucl-ai-agent/
├── backend/
│   ├── src/
│   │   ├── services/aiAgent.js      # Agent IA principal
│   │   ├── scrapers/
│   │   │   ├── uefaScraper.js       # Scraper UEFA
│   │   │   └── beinSportsScraper.js # Scraper beIN
│   │   ├── jobs/aiSyncJob.js        # CRON auto-sync
│   │   ├── models/
│   │   │   ├── AIKnowledge.js       # Connaissances IA
│   │   │   └── Match.js             # Données matchs
│   │   └── routes/ai.js             # API endpoints
│   └── docker-compose.yml           # Redis + Qdrant
├── web/
│   └── src/
│       ├── components/ai/
│       │   └── AIInsightsCard.tsx   # Widget insights
│       └── app/admin/
│           └── ai-monitor/page.tsx  # Dashboard admin
└── README.md
```

## 📝 Configuration

Créer `.env` dans `/backend` :

```env
# MongoDB (Atlas Free Tier)
MONGODB_URI=mongodb://localhost:27017/ucl-ai

# Ollama (Local)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1

# Qdrant (Docker local)
QDRANT_URL=http://localhost:6333

# Redis (Docker local)
REDIS_URL=redis://localhost:6379

# Scraping
SCRAPING_INTERVAL_MINUTES=60
USER_AGENT=Mozilla/5.0 (compatible; UCL-Bot/1.0)

# Features
AI_AGENT_ENABLED=true
VECTOR_SEARCH_ENABLED=true
```

## 🎓 Documentation

- [Architecture détaillée](./docs/ARCHITECTURE.md)
- [Guide de scraping](./docs/SCRAPING.md)
- [Prompt engineering](./docs/PROMPTS.md)
- [Déploiement](./docs/DEPLOYMENT.md)

## 📄 Licence

MIT - Free to use
