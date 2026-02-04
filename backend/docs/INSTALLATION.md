# 🚀 Guide d'Installation - UCL AI Agent

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Installation rapide](#installation-rapide)
3. [Installation manuelle](#installation-manuelle)
4. [Configuration](#configuration)
5. [Vérification](#vérification)
6. [Dépannage](#dépannage)

---

## 🎯 Prérequis

### Obligatoires

- **Node.js 20+** → [Télécharger](https://nodejs.org)
- **Docker** → [Télécharger](https://docs.docker.com/get-docker/)
- **Ollama** (LLM local gratuit) → [Télécharger](https://ollama.com)

### Vérifier les installations

```bash
# Node.js
node --version  # doit afficher v20.x.x ou supérieur

# Docker
docker --version

# Ollama
ollama --version
```

---

## ⚡ Installation Rapide

### Linux / macOS

```bash
# 1. Télécharger le projet
git clone <votre-repo>
cd ucl-ai-agent

# 2. Lancer le script d'installation
chmod +x setup.sh
./setup.sh

# 3. Démarrer le serveur
cd backend
npm run dev
```

### Windows

```powershell
# 1. Télécharger le projet
git clone <votre-repo>
cd ucl-ai-agent

# 2. Installer les dépendances
cd backend
npm install

# 3. Copier la config
copy .env.example .env

# 4. Démarrer Docker
docker-compose up -d

# 5. Démarrer le serveur
npm run dev
```

---

## 🔧 Installation Manuelle

### 1️⃣ Installer Ollama

#### Linux / macOS

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

#### Windows

Télécharger depuis [ollama.com/download](https://ollama.com/download)

#### Télécharger le modèle IA

```bash
# Llama 3.1 (recommandé, ~4GB)
ollama pull llama3.1

# Alternatives plus légères:
ollama pull mistral      # ~4GB
ollama pull phi-3        # ~2GB
ollama pull gemma        # ~2GB

# Vérifier
ollama list
```

### 2️⃣ Configurer Docker

#### Démarrer les services

```bash
cd backend
docker-compose up -d
```

#### Vérifier les services

```bash
docker-compose ps
```

Vous devriez voir :
- ✅ `ucl-redis` (port 6379)
- ✅ `ucl-qdrant` (ports 6333, 6334)
- ✅ `ucl-mongodb` (port 27017)

### 3️⃣ Installer les dépendances Node.js

```bash
cd backend
npm install
```

### 4️⃣ Configurer l'environnement

```bash
# Copier le fichier .env
cp .env.example .env

# Éditer la configuration
nano .env  # ou vim, code, etc.
```

**Configuration minimale:**

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/ucl-ai

# Ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1

# Qdrant
QDRANT_URL=http://localhost:6333

# Redis
REDIS_URL=redis://localhost:6379

# Features
AI_AGENT_ENABLED=true
AUTO_SCRAPING_ENABLED=true
```

### 5️⃣ Démarrer le serveur

```bash
# Mode développement (avec rechargement auto)
npm run dev

# Mode production
npm start
```

---

## ⚙️ Configuration

### Variables d'environnement importantes

| Variable | Description | Défaut |
|----------|-------------|--------|
| `PORT` | Port du serveur | `5000` |
| `OLLAMA_MODEL` | Modèle LLM à utiliser | `llama3.1` |
| `SCRAPING_INTERVAL_MINUTES` | Fréquence du scraping | `60` |
| `AI_AGENT_ENABLED` | Activer l'agent IA | `true` |
| `AUTO_SCRAPING_ENABLED` | Scraping automatique | `true` |
| `LOG_LEVEL` | Niveau de logs | `info` |

### Modifier la fréquence de scraping

```env
# Toutes les 30 minutes
SCRAPING_INTERVAL_MINUTES=30

# Toutes les 2 heures
SCRAPING_INTERVAL_MINUTES=120
```

### Changer de modèle LLM

```bash
# Télécharger un nouveau modèle
ollama pull mistral

# Modifier .env
OLLAMA_MODEL=mistral
```

---

## ✅ Vérification

### 1. Vérifier l'API

```bash
curl http://localhost:5000/health
```

**Réponse attendue:**

```json
{
  "status": "healthy",
  "timestamp": "2024-...",
  "uptime": 123.456
}
```

### 2. Vérifier l'agent IA

```bash
curl http://localhost:5000/api/ai/health
```

**Réponse attendue:**

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "ollama": true,
    "qdrant": true,
    "model": "llama3.1"
  }
}
```

### 3. Tester le chat IA

```bash
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Qui a gagné la Ligue des Champions 2023?"}'
```

### 4. Vérifier les services Docker

```bash
# Status
docker-compose ps

# Logs Redis
docker-compose logs redis

# Logs Qdrant
docker-compose logs qdrant

# Tous les logs
docker-compose logs -f
```

---

## 🔍 Dépannage

### ❌ Erreur: "Ollama connection failed"

**Solutions:**

```bash
# Vérifier qu'Ollama tourne
ollama list

# Démarrer Ollama (si pas déjà en service)
ollama serve

# Tester la connexion
curl http://localhost:11434/api/version
```

### ❌ Erreur: "MongoDB connection failed"

**Solutions:**

```bash
# Redémarrer MongoDB
docker-compose restart mongodb

# Vérifier les logs
docker-compose logs mongodb

# Tester la connexion
mongosh mongodb://localhost:27017/ucl-ai
```

### ❌ Erreur: "Qdrant connection failed"

**Solutions:**

```bash
# Redémarrer Qdrant
docker-compose restart qdrant

# Vérifier les logs
docker-compose logs qdrant

# Tester l'API
curl http://localhost:6333/collections
```

### ❌ Erreur: "Redis connection failed"

**Solutions:**

```bash
# Redémarrer Redis
docker-compose restart redis

# Tester la connexion
docker exec -it ucl-redis redis-cli ping
# Doit retourner: PONG
```

### ❌ Port déjà utilisé

```bash
# Trouver le processus utilisant le port 5000
lsof -i :5000  # Linux/Mac
netstat -ano | findstr :5000  # Windows

# Changer le port dans .env
PORT=5001
```

### ❌ Modèle Ollama introuvable

```bash
# Lister les modèles installés
ollama list

# Télécharger le modèle manquant
ollama pull llama3.1

# Vérifier dans .env que OLLAMA_MODEL correspond
```

### 🐛 Mode Debug

Activer les logs détaillés:

```env
LOG_LEVEL=debug
NODE_ENV=development
```

---

## 📊 Commandes Utiles

### Docker

```bash
# Démarrer tous les services
docker-compose up -d

# Arrêter tous les services
docker-compose down

# Voir les logs en temps réel
docker-compose logs -f

# Redémarrer un service
docker-compose restart redis

# Nettoyer (⚠️ supprime les données)
docker-compose down -v
```

### Ollama

```bash
# Lister les modèles
ollama list

# Télécharger un modèle
ollama pull <model-name>

# Supprimer un modèle
ollama rm <model-name>

# Tester un modèle
ollama run llama3.1 "Bonjour!"
```

### Backend

```bash
# Développement
npm run dev

# Production
npm start

# Tests (TODO)
npm test

# Scraping manuel
npm run scrape
```

---

## 🎯 Prochaines Étapes

Une fois l'installation réussie:

1. ✅ Consulter la [Documentation API](./API.md)
2. ✅ Lire le [Guide de Développement](./DEVELOPMENT.md)
3. ✅ Tester les endpoints avec Postman
4. ✅ Créer le frontend React

---

## 📞 Support

En cas de problème:

1. Vérifier les [Issues GitHub](lien-vers-issues)
2. Consulter la [FAQ](./FAQ.md)
3. Créer une nouvelle Issue avec:
   - Description du problème
   - Logs d'erreur
   - Configuration (masquer les secrets!)
   - Environnement (OS, versions)

---

## 💰 Rappel: Coûts = 0€

- ✅ Ollama → 100% gratuit, local
- ✅ Qdrant → Self-hosted gratuit
- ✅ Redis → Self-hosted gratuit
- ✅ MongoDB → Free tier ou local
- ✅ Puppeteer → Gratuit

**Aucun frais API externe!** 🎉
