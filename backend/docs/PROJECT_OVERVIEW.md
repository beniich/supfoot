# 🤖 UCL AI Agent - Projet Complet

## 📦 Contenu du Projet

Ce package contient l'implémentation complète d'un **agent IA pour la Ligue des Champions** utilisant uniquement des solutions **100% gratuites**.

---

## 📁 Structure du Projet

```
ucl-ai-agent/
├── README.md                      # Documentation principale
├── INSTALLATION.md                # Guide d'installation détaillé
├── QUICKSTART.md                  # Démarrage rapide (5 minutes)
├── API.md                         # Documentation complète de l'API
├── setup.sh                       # Script d'installation automatique
│
├── backend/
│   ├── package.json              # Dépendances Node.js
│   ├── docker-compose.yml        # Redis + Qdrant + MongoDB
│   ├── .env.example              # Configuration (à copier en .env)
│   │
│   └── src/
│       ├── index.js              # Serveur Express principal
│       ├── config/
│       │   └── database.js       # Configuration MongoDB
│       ├── models/
│       │   ├── AIKnowledge.js    # Modèle des connaissances IA
│       │   └── Match.js          # Modèle des matchs
│       ├── services/
│       │   └── aiAgent.js        # 🤖 Agent IA principal (Ollama)
│       ├── scrapers/
│       │   └── uefaScraper.js    # Scraper UEFA (Puppeteer)
│       ├── jobs/
│       │   └── aiSyncJob.js      # Job CRON auto-sync
│       ├── routes/
│       │   └── ai.js             # Routes API
│       └── utils/
│           └── logger.js         # Système de logs
│
└── web/
    └── src/
        └── components/
            └── ai/
                └── AIInsightsCard.tsx  # Composant React
```

---

## 🎯 Fonctionnalités Implémentées

### Backend (✅ Complet)

- ✅ **Agent IA avec Ollama** (Llama 3.1, Mistral, etc.)
- ✅ **Scraping UEFA** avec Puppeteer
- ✅ **Base vectorielle** Qdrant pour recherche sémantique
- ✅ **Jobs CRON automatisés** avec BullMQ + Redis
- ✅ **API REST complète** (10+ endpoints)
- ✅ **Rate limiting** et sécurité
- ✅ **Logging** avec Winston
- ✅ **MongoDB** pour persistance
- ✅ **Docker Compose** pour services
- ✅ **Health checks** complets

### Frontend (✅ Composant de base)

- ✅ **AIInsightsCard** React/TypeScript
- ✅ **Design moderne** avec Tailwind CSS
- ✅ **États de chargement** et erreurs
- ✅ **Responsive** et accessible

---

## 💰 Stack 100% Gratuite

| Service | Solution Gratuite | Coût |
|---------|-------------------|------|
| **LLM** | Ollama (Llama 3.1, Mistral) | 0€ |
| **Vector DB** | Qdrant (self-hosted) | 0€ |
| **Queue** | Redis + BullMQ | 0€ |
| **Database** | MongoDB (local ou Atlas Free) | 0€ |
| **Web Scraping** | Puppeteer | 0€ |
| **Backend** | Node.js + Express | 0€ |
| **Frontend** | React + Vite | 0€ |

**TOTAL : 0€/mois** 🎉

---

## 🚀 Démarrage en 3 Étapes

### 1️⃣ Installation des prérequis

```bash
# Installer Ollama
curl -fsSL https://ollama.com/install.sh | sh  # Linux/Mac
# ou télécharger depuis ollama.com pour Windows

# Télécharger le modèle
ollama pull llama3.1
```

### 2️⃣ Configuration

```bash
# Lancer le script d'installation
cd ucl-ai-agent
chmod +x setup.sh
./setup.sh
```

### 3️⃣ Démarrage

```bash
cd backend
npm run dev
```

✅ API disponible sur : http://localhost:5000

---

## 📡 Endpoints API Principaux

### Insights IA

```bash
# Obtenir l'analyse d'un match
GET /api/ai/insights/match/:matchId

# Analyser un match manuellement
POST /api/ai/analyze/match

# Prédire un match
POST /api/ai/predict
```

### Chat & Recherche

```bash
# Chat conversationnel
POST /api/ai/chat

# Recherche sémantique
GET /api/ai/search?q=Real+Madrid

# Connaissances récentes
GET /api/ai/knowledge/recent
```

Voir [API.md](./API.md) pour la documentation complète.

---

## 🎨 Utilisation Frontend

```jsx
import AIInsightsCard from './components/ai/AIInsightsCard';

function MatchPage() {
  return (
    <div className="container mx-auto p-6">
      <AIInsightsCard matchId="12345" />
    </div>
  );
}
```

---

## 🔧 Configuration Personnalisée

### Changer de modèle IA

```bash
# Télécharger un autre modèle
ollama pull mistral

# Modifier .env
OLLAMA_MODEL=mistral
```

### Ajuster la fréquence de scraping

```env
# Toutes les 30 minutes
SCRAPING_INTERVAL_MINUTES=30

# Toutes les 2 heures
SCRAPING_INTERVAL_MINUTES=120
```

### Personnaliser les prompts IA

Éditez `backend/src/services/aiAgent.js` :

```javascript
this.systemPrompt = `
  Tu es un expert en Ligue des Champions...
  [Personnalisez ici]
`;
```

---

## 📊 Capacités de l'Agent IA

L'agent peut :

- ✅ Analyser les matchs et générer des insights tactiques
- ✅ Prédire les résultats avec niveau de confiance
- ✅ Identifier les joueurs clés
- ✅ Générer des résumés de saison
- ✅ Répondre à des questions en langage naturel
- ✅ Effectuer des recherches sémantiques
- ✅ Comparer des équipes

---

## 🛠️ Développement

### Ajouter une nouvelle source de scraping

1. Créer `backend/src/scrapers/nouvelleSource.js`
2. Implémenter les méthodes de scraping
3. Intégrer dans `aiSyncJob.js`

### Ajouter un nouvel endpoint API

1. Ajouter la route dans `backend/src/routes/ai.js`
2. Implémenter la logique dans `aiAgent.js`
3. Documenter dans `API.md`

### Personnaliser le frontend

Les composants sont dans `web/src/components/ai/`

---

## 📈 Métriques & Monitoring

L'API expose des métriques :

- Nombre total de connaissances IA
- Statistiques par type d'analyse
- Niveau de confiance moyen
- Nombre de vues
- Feedbacks utilisateurs

```bash
GET /api/ai/knowledge/stats
```

---

## 🐛 Dépannage

### Problèmes courants

| Problème | Solution |
|----------|----------|
| Ollama connection failed | `ollama serve` |
| MongoDB connection failed | `docker-compose restart mongodb` |
| Port already in use | Changer `PORT` dans `.env` |
| Model not found | `ollama pull llama3.1` |

Voir [INSTALLATION.md](./INSTALLATION.md#dépannage) pour plus de détails.

---

## 📚 Documentation Complète

- **[README.md](./README.md)** - Vue d'ensemble du projet
- **[INSTALLATION.md](./INSTALLATION.md)** - Guide d'installation détaillé
- **[QUICKSTART.md](./QUICKSTART.md)** - Démarrage rapide (5 min)
- **[API.md](./API.md)** - Documentation API complète

---

## 🎯 Prochaines Étapes

1. ✅ Installer et tester l'API
2. ✅ Intégrer le composant React dans votre app
3. ✅ Ajouter plus de sources de scraping (beIN Sports, etc.)
4. ✅ Personnaliser les prompts IA
5. ✅ Déployer en production

---

## 🔐 Production Ready

Pour la production :

- [ ] Ajouter l'authentification JWT
- [ ] Configurer HTTPS
- [ ] Utiliser MongoDB Atlas
- [ ] Déployer sur un serveur cloud
- [ ] Configurer un reverse proxy (Nginx)
- [ ] Activer les métriques Prometheus
- [ ] Configurer les backups automatiques

---

## 📄 Licence

MIT - Libre d'utilisation

---

## 🙏 Crédits

- **Ollama** - LLM local gratuit
- **Qdrant** - Vector database
- **Puppeteer** - Web scraping
- **LangChain** - Framework IA
- **BullMQ** - Job queue

---

## 🎉 Prêt à Démarrer !

```bash
cd ucl-ai-agent
./setup.sh
cd backend
npm run dev
```

Visitez http://localhost:5000

**Profitez de votre agent IA Ligue des Champions 100% gratuit !** 🚀⚽🤖
