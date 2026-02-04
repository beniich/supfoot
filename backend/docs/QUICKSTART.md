# ⚡ Démarrage Rapide - UCL AI Agent

## 🎯 En 5 minutes chrono !

### 📋 Prérequis

Vérifiez que vous avez tout :

```bash
node --version  # v20+
docker --version
ollama --version
```

Si pas installé → Voir [INSTALLATION.md](./INSTALLATION.md)

---

## 🚀 Installation Express

### Option A: Script automatique (Linux/Mac)

```bash
./setup.sh
cd backend
npm run dev
```

### Option B: Manuelle (toutes plateformes)

```bash
# 1. Installer Ollama et télécharger le modèle
ollama pull llama3.1

# 2. Démarrer Docker
cd backend
docker-compose up -d

# 3. Installer les dépendances
npm install

# 4. Configurer l'environnement
cp .env.example .env

# 5. Démarrer le serveur
npm run dev
```

---

## ✅ Vérification

### 1. Santé du serveur

```bash
curl http://localhost:5000/health
```

✅ Devrait retourner: `{"status":"healthy",...}`

### 2. Santé de l'IA

```bash
curl http://localhost:5000/api/ai/health
```

✅ Devrait retourner: `{"success":true,"data":{"status":"healthy",...}}`

### 3. Test du chat

```bash
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Bonjour!"}'
```

✅ Devrait retourner une réponse de l'IA

---

## 📡 Endpoints Principaux

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/health` | GET | Status du serveur |
| `/api/ai/health` | GET | Status de l'IA |
| `/api/ai/insights/match/:id` | GET | Insights d'un match |
| `/api/ai/chat` | POST | Chat avec l'IA |
| `/api/ai/predict` | POST | Prédire un match |
| `/api/ai/search` | GET | Recherche sémantique |

Voir [API.md](./API.md) pour la doc complète.

---

## 🎨 Utilisation Frontend

### Installation du composant React

```bash
cd web
npm install
```

### Utilisation

```jsx
import AIInsightsCard from './components/ai/AIInsightsCard';

function MatchPage({ matchId }) {
  return (
    <div>
      <AIInsightsCard matchId={matchId} />
    </div>
  );
}
```

---

## 🔧 Configuration

### Variables importantes (.env)

```env
# Modèle IA (llama3.1, mistral, phi-3, gemma)
OLLAMA_MODEL=llama3.1

# Fréquence de scraping (minutes)
SCRAPING_INTERVAL_MINUTES=60

# Activer/désactiver features
AI_AGENT_ENABLED=true
AUTO_SCRAPING_ENABLED=true
```

---

## 🛠️ Commandes Utiles

### Backend

```bash
npm run dev      # Mode développement
npm start        # Mode production
npm run scrape   # Scraping manuel
```

### Docker

```bash
docker-compose up -d      # Démarrer
docker-compose down       # Arrêter
docker-compose logs -f    # Voir les logs
docker-compose ps         # Status
```

### Ollama

```bash
ollama list              # Lister les modèles
ollama pull llama3.1     # Télécharger un modèle
ollama run llama3.1      # Tester un modèle
```

---

## 📊 Fonctionnalités Disponibles

- ✅ Scraping automatique UEFA
- ✅ Analyse IA des matchs (local, gratuit)
- ✅ Prédictions basées sur l'historique
- ✅ Chat conversationnel
- ✅ Recherche sémantique
- ✅ API REST complète
- ✅ Composant React prêt à l'emploi
- ✅ Jobs CRON automatisés
- ✅ Vector database (Qdrant)
- ✅ Rate limiting

---

## 🎯 Prochaines Étapes

1. ✅ Tester l'API avec Postman/curl
2. ✅ Lire la [documentation API](./API.md)
3. ✅ Intégrer le composant React
4. ✅ Personnaliser les prompts IA
5. ✅ Ajouter plus de sources de scraping

---

## 🐛 Problèmes Fréquents

### "Ollama connection failed"

```bash
ollama serve  # Démarrer Ollama
```

### "MongoDB connection failed"

```bash
docker-compose restart mongodb
```

### "Port 5000 already in use"

```env
# Changer dans .env
PORT=5001
```

Voir [INSTALLATION.md](./INSTALLATION.md#dépannage) pour plus d'aide.

---

## 💰 Coûts

**TOTAL : 0€/mois** 🎉

- Ollama : Gratuit (local)
- Qdrant : Gratuit (self-hosted)
- Redis : Gratuit (self-hosted)
- MongoDB : Free tier ou local
- Puppeteer : Gratuit

---

## 📞 Support

- 📖 [Documentation complète](./README.md)
- 🔧 [Guide d'installation](./INSTALLATION.md)
- 📡 [Documentation API](./API.md)
- 🐛 Issues GitHub

---

## 🎉 Bravo !

Votre agent IA Ligue des Champions est prêt !

```bash
# Lancer et profiter 🚀
cd backend
npm run dev
```

Ouvrez http://localhost:5000 dans votre navigateur.
