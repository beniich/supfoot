# 🔑 Guide Complet des Intégrations API - FootballHub+

Ce document liste **toutes les intégrations externes** nécessaires pour faire fonctionner FootballHub+ en production.

---

## 📊 Tableau Récapitulatif

| Service | Priorité | Gratuit ? | Utilisation | Lien d'inscription |
|---------|----------|-----------|-------------|-------------------|
| **MongoDB Atlas** | 🔴 **CRITIQUE** | ✅ Oui (512 MB) | Base de données principale | https://www.mongodb.com/cloud/atlas |
| **SportMonks** | 🔴 **CRITIQUE** | ❌ Non (€49/mois) | Données football (matchs, news) | https://www.sportmonks.com |
| **Redis** | 🟠 **IMPORTANT** | ✅ Oui (local) | Cache & WebSockets | https://redis.io/download |
| **Stripe** | 🟠 **IMPORTANT** | ✅ Oui (commission) | Paiements e-commerce | https://stripe.com |
| **Firebase** | 🟡 **RECOMMANDÉ** | ✅ Oui (quotas) | Push notifications mobiles | https://console.firebase.google.com |
| **Resend** | 🟡 **RECOMMANDÉ** | ✅ Oui (100/jour) | Envoi d'emails (newsletter) | https://resend.com |
| **YouTube API** | 🟡 **RECOMMANDÉ** | ✅ Oui (10k req/jour) | Vidéos liées aux news | https://console.cloud.google.com |
| **Cloudinary** | 🟢 **OPTIONNEL** | ✅ Oui (25 GB) | Hébergement images | https://cloudinary.com |
| **Sentry** | 🟢 **OPTIONNEL** | ✅ Oui (5k events/mois) | Monitoring erreurs | https://sentry.io |

---

## 🔴 CRITIQUES (L'app ne fonctionne pas sans)

### 1. MongoDB Atlas
**Rôle** : Stockage de toutes les données (utilisateurs, matchs, news, commandes).

**Configuration actuelle** :
```env
MONGODB_URI=mongodb+srv://cloudinstall9:1985%40Trbm@yofoot.awptx0z.mongodb.net/?appName=yofoot
```
✅ **Déjà configuré !** Votre cluster MongoDB est actif.

---

### 2. SportMonks API
**Rôle** : Fournit les données en temps réel (matchs, classements, news).

**Statut actuel** : ❌ **MANQUANT**
```env
# À AJOUTER dans .env
SPORTMONKS_API_TOKEN=votre_token_ici
```

**Comment obtenir** :
1. Aller sur https://www.sportmonks.com/football-api/pricing
2. Choisir le plan "Football API" (€49/mois minimum)
3. Récupérer votre token dans le dashboard
4. L'ajouter dans `.env`

**Alternative gratuite (limitée)** :
- API-Football (RapidAPI) : https://rapidapi.com/api-sports/api/api-football
  - 100 requêtes/jour gratuites
  - Déjà configuré dans votre code : `RAPIDAPI_KEY`

---

## 🟠 IMPORTANTS (Fonctionnalités majeures)

### 3. Redis
**Rôle** : Cache API, WebSockets multi-serveurs, Files d'attente BullMQ.

**Installation locale (Windows)** :
```powershell
# Option 1 : Via Chocolatey
choco install redis-64

# Option 2 : Via Docker
docker run -d -p 6379:6379 redis:alpine

# Option 3 : Redis Cloud (gratuit 30 MB)
# https://redis.com/try-free/
```

**Configuration** :
```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=  # Vide si local
```

**Si vous n'installez pas Redis** :
- ⚠️ Le cache ne fonctionnera pas (requêtes API plus lentes)
- ⚠️ BullMQ ne fonctionnera pas (jobs synchrones)
- ⚠️ WebSockets limités à 1 serveur

---

### 4. Stripe
**Rôle** : Gestion des paiements (billetterie, boutique).

**Statut actuel** : ⚠️ **Clé de test visible**
```env
STRIPE_SECRET_KEY=rk_live_51MfkUVAH6SDHg3Nz...  # ⚠️ Clé LIVE exposée !
```

**ACTION URGENTE** :
1. ⚠️ **RÉVOQUER cette clé** sur https://dashboard.stripe.com/apikeys
2. Créer de nouvelles clés (Test + Live)
3. Mettre la clé **TEST** dans `.env` pour le développement

**Comment obtenir** :
1. Créer un compte sur https://stripe.com
2. Aller dans "Developers" → "API Keys"
3. Copier la clé **secrète de test** (`sk_test_...`)

---

## 🟡 RECOMMANDÉS (Améliorent l'expérience)

### 5. Firebase (Push Notifications)
**Rôle** : Envoyer des notifications push aux mobiles.

**Statut actuel** : ❌ **MANQUANT**
```env
# À AJOUTER
FIREBASE_DATABASE_URL=https://votre-projet.firebaseio.com
# + Fichier firebase-service-account.json
```

**Comment obtenir** :
1. Aller sur https://console.firebase.google.com
2. Créer un projet "FootballHub"
3. Aller dans "Project Settings" → "Service Accounts"
4. Cliquer "Generate New Private Key"
5. Télécharger le fichier JSON et le renommer `firebase-service-account.json`
6. Le placer dans `backend/`

**Sans Firebase** :
- ❌ Pas de notifications push mobiles
- ✅ Les emails fonctionneront quand même

---

### 6. Resend (Emails)
**Rôle** : Envoi d'emails (newsletter, confirmations de commande).

**Statut actuel** : ❌ **MANQUANT**
```env
RESEND_API_KEY=re_votre_cle_ici
```

**Comment obtenir** :
1. Aller sur https://resend.com/signup
2. Vérifier votre domaine (ou utiliser `onboarding@resend.dev` pour tester)
3. Créer une clé API
4. L'ajouter dans `.env`

**Plan gratuit** : 100 emails/jour (suffisant pour débuter)

**Sans Resend** :
- ❌ Pas de newsletter automatique
- ❌ Pas d'emails de confirmation

---

### 7. YouTube Data API
**Rôle** : Afficher des vidéos liées aux articles de news.

**Statut actuel** : ❌ **MANQUANT**
```env
# À AJOUTER
YOUTUBE_API_KEY=votre_cle_youtube_ici
```

**Comment obtenir** :
1. Aller sur https://console.cloud.google.com
2. Créer un projet "FootballHub"
3. Activer "YouTube Data API v3"
4. Créer une clé API (Credentials → Create Credentials → API Key)
5. L'ajouter dans `.env`

**Plan gratuit** : 10,000 requêtes/jour (largement suffisant)

**Sans YouTube API** :
- ❌ Pas de vidéos sous les articles
- ✅ Le reste fonctionne normalement

---

## 🟢 OPTIONNELS (Confort & Production)

### 8. Cloudinary (Images)
**Rôle** : Hébergement et optimisation d'images.

**Statut actuel** : ❌ **MANQUANT**
```env
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

**Alternative** : Vous pouvez utiliser le stockage local (`UPLOAD_DIR=./uploads`) pour le développement.

---

### 9. Sentry (Monitoring)
**Rôle** : Recevoir des alertes quand un bug survient en production.

**Statut actuel** : ❌ **MANQUANT**
```env
SENTRY_DSN=https://votre_cle@sentry.io/projet_id
```

**Comment obtenir** :
1. Aller sur https://sentry.io/signup
2. Créer un projet "FootballHub Backend"
3. Copier le DSN
4. L'ajouter dans `.env`

**Plan gratuit** : 5,000 erreurs/mois

**Sans Sentry** :
- ⚠️ Vous ne serez pas alerté des bugs en production
- ✅ L'app fonctionne normalement

---

## 📝 Fichier .env Complet Recommandé

Voici un template `.env` avec toutes les clés nécessaires :

```env
# ============================================================================
# APPLICATION
# ============================================================================
NODE_ENV=development
PORT=5000

# ============================================================================
# DATABASE (CRITIQUE)
# ============================================================================
MONGODB_URI=mongodb+srv://cloudinstall9:1985%40Trbm@yofoot.awptx0z.mongodb.net/?appName=yofoot

# ============================================================================
# SECURITY
# ============================================================================
JWT_SECRET=votre-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=7d
CORS_ORIGIN=http://localhost:3000,http://localhost:5173

# ============================================================================
# REDIS (IMPORTANT)
# ============================================================================
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# ============================================================================
# SPORTMONKS API (CRITIQUE)
# ============================================================================
SPORTMONKS_API_TOKEN=VOTRE_TOKEN_ICI

# Alternative gratuite (100 req/jour)
RAPIDAPI_KEY=VOTRE_CLE_RAPIDAPI_ICI

# ============================================================================
# STRIPE PAYMENTS (IMPORTANT)
# ============================================================================
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_TEST_ICI
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_SECRET_ICI
STRIPE_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_PUBLIQUE_ICI

# ============================================================================
# FIREBASE PUSH NOTIFICATIONS (RECOMMANDÉ)
# ============================================================================
FIREBASE_DATABASE_URL=https://votre-projet.firebaseio.com
# Fichier : backend/firebase-service-account.json

# ============================================================================
# RESEND EMAIL (RECOMMANDÉ)
# ============================================================================
RESEND_API_KEY=re_VOTRE_CLE_ICI

# ============================================================================
# YOUTUBE API (RECOMMANDÉ)
# ============================================================================
YOUTUBE_API_KEY=VOTRE_CLE_YOUTUBE_ICI

# ============================================================================
# CLOUDINARY (OPTIONNEL)
# ============================================================================
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret

# ============================================================================
# SENTRY MONITORING (OPTIONNEL)
# ============================================================================
SENTRY_DSN=https://votre_cle@sentry.io/projet_id

# ============================================================================
# AI FEATURES (OPTIONNEL - Local)
# ============================================================================
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1
AI_AGENT_ENABLED=false

# ============================================================================
# UPLOADS
# ============================================================================
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads
```

---

## ✅ Checklist de Configuration

### Pour le Développement Local (Minimum)
- [x] MongoDB Atlas (déjà fait)
- [ ] Redis (installer localement)
- [ ] SportMonks API OU RapidAPI
- [ ] Stripe (clés de test)

### Pour la Production
- [ ] Tous les services ci-dessus
- [ ] Firebase (notifications)
- [ ] Resend (emails)
- [ ] YouTube API
- [ ] Sentry (monitoring)
- [ ] Cloudinary (images)

---

## 🆘 Besoin d'Aide ?

Si vous avez des questions sur l'une de ces intégrations, demandez-moi et je vous guiderai étape par étape !
