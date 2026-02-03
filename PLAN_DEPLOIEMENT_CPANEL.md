# 📋 Plan de Déploiement cPanel - FootballHub+

## 🎯 Objectif
Déployer l'application FootballHub+ (Backend Node.js + Frontend Next.js) sur un serveur cPanel via le terminal SSH, en utilisant le code déjà présent sur GitHub.

---

## 📦 Prérequis

### Sur cPanel
- ✅ Accès SSH activé
- ✅ Node.js installé (version 18+ recommandée)
- ✅ Git installé
- ✅ Accès au terminal cPanel
- ✅ Nom de domaine ou sous-domaine configuré

### Sur MongoDB Atlas
- ✅ Cluster MongoDB créé
- ✅ Utilisateur de base de données créé
- ✅ URI de connexion disponible

### Sur GitHub
- ✅ Code source pushé
- ✅ Repository accessible (public ou avec token d'accès)

---

## 🚀 PHASE 1 : Préparation de l'environnement cPanel

### 1.1 Connexion SSH au serveur cPanel

```bash
# Depuis votre terminal local (PowerShell)
ssh votre_utilisateur@votre_domaine.com
# Ou utilisez le terminal intégré de cPanel
```

### 1.2 Vérification de Node.js

```bash
# Vérifier la version de Node.js
node --version

# Si Node.js n'est pas installé ou version < 18
# Utilisez l'interface cPanel "Setup Node.js App" pour installer la bonne version
```

### 1.3 Vérification de Git

```bash
# Vérifier Git
git --version

# Si Git n'est pas disponible, contactez votre hébergeur
```

### 1.4 Obtenir l'IP du serveur pour MongoDB Atlas

```bash
# Obtenir l'IP publique du serveur
curl ifconfig.me

# Copier cette IP et l'ajouter dans MongoDB Atlas :
# Atlas → Network Access → Add IP Address
```

---

## 🚀 PHASE 2 : Cloner le projet depuis GitHub

### 2.1 Créer un dossier pour l'application

```bash
# Aller dans le répertoire home
cd ~

# Créer un dossier pour vos projets (si pas déjà fait)
mkdir -p repositories
cd repositories

# Cloner le repository GitHub
git clone https://github.com/VOTRE_USERNAME/supfootball.git
cd supfootball
```

**Note :** Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub.

### 2.2 Vérifier la structure du projet

```bash
# Lister les dossiers
ls -la

# Vous devriez voir :
# - backend/
# - web/
# - README.md
# - etc.
```

---

## 🚀 PHASE 3 : Configuration et déploiement du BACKEND

### 3.1 Installation des dépendances

```bash
# Aller dans le dossier backend
cd ~/repositories/supfootball/backend

# Installer les dépendances
npm install --production
```

### 3.2 Configuration des variables d'environnement

```bash
# Créer le fichier .env
nano .env
```

**Contenu du fichier `.env` :**

```env
# MongoDB
MONGODB_URI=mongodb+srv://cloudinstall9:1985%40Trbm@yofoot.awptx0z.mongodb.net/?appName=yofoot

# Environnement
NODE_ENV=production

# Port du serveur
PORT=5000

# JWT Secret (générez une clé secrète forte)
JWT_SECRET=votre_cle_secrete_super_forte_ici_changez_moi

# JWT Expiration
JWT_EXPIRES_IN=7d

# CORS Origin (votre domaine frontend)
CORS_ORIGIN=https://votre-domaine.com

# API Football (si vous utilisez une API externe)
FOOTBALL_API_KEY=votre_cle_api_football

# Stripe (si vous utilisez Stripe pour les paiements)
STRIPE_SECRET_KEY=votre_cle_stripe_secrete
STRIPE_PUBLISHABLE_KEY=votre_cle_stripe_publique

# Firebase (si vous utilisez Firebase)
FIREBASE_PROJECT_ID=votre_project_id
FIREBASE_PRIVATE_KEY=votre_private_key
FIREBASE_CLIENT_EMAIL=votre_client_email

# Redis (si vous utilisez Redis pour le cache)
REDIS_URL=redis://localhost:6379

# Logs
LOG_LEVEL=info
```

**Sauvegarder :** `Ctrl+O` → `Entrée` → `Ctrl+X`

### 3.3 Tester le backend localement

```bash
# Lancer le serveur en mode test
npm start

# Vérifier dans un autre terminal ou navigateur
# curl http://localhost:5000/api/health
```

**Si ça fonctionne, arrêtez avec `Ctrl+C`**

### 3.4 Configuration avec PM2 (Process Manager)

```bash
# Installer PM2 globalement (si pas déjà fait)
npm install -g pm2

# Lancer le backend avec PM2
pm2 start src/index.js --name footballhub-backend

# Vérifier le statut
pm2 status

# Voir les logs
pm2 logs footballhub-backend

# Sauvegarder la configuration PM2
pm2 save

# Configurer PM2 pour démarrer au boot
pm2 startup
# Suivez les instructions affichées
```

### 3.5 Configuration via l'interface cPanel (Alternative)

Si votre hébergeur ne permet pas PM2, utilisez l'interface **Setup Node.js App** de cPanel :

1. Ouvrir **Setup Node.js App** dans cPanel
2. Cliquer sur **Create Application**
3. Configurer :
   - **Node.js version** : 18.x ou supérieur
   - **Application mode** : Production
   - **Application root** : `repositories/supfootball/backend`
   - **Application URL** : `api.votre-domaine.com` ou sous-dossier
   - **Application startup file** : `src/index.js`
4. Ajouter les variables d'environnement (voir section 3.2)
5. Cliquer sur **Create**

---

## 🚀 PHASE 4 : Configuration et déploiement du FRONTEND

### 4.1 Installation des dépendances

```bash
# Aller dans le dossier web
cd ~/repositories/supfootball/web

# Installer les dépendances
npm install --legacy-peer-deps
```

### 4.2 Configuration des variables d'environnement

```bash
# Créer le fichier .env.local
nano .env.local
```

**Contenu du fichier `.env.local` :**

```env
# URL de l'API Backend
NEXT_PUBLIC_API_URL=https://api.votre-domaine.com
# OU si backend sur le même domaine
# NEXT_PUBLIC_API_URL=https://votre-domaine.com/api

# URL WebSocket
NEXT_PUBLIC_WS_URL=wss://api.votre-domaine.com

# Autres variables publiques
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
NEXT_PUBLIC_SITE_NAME=FootballHub+

# Stripe (clé publique)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=votre_cle_stripe_publique

# Firebase (si utilisé côté client)
NEXT_PUBLIC_FIREBASE_API_KEY=votre_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre_firebase_project_id
```

**Sauvegarder :** `Ctrl+O` → `Entrée` → `Ctrl+X`

### 4.3 Build du frontend

```bash
# Builder l'application Next.js pour la production
npm run build

# Vérifier que le build s'est bien passé
# Vous devriez voir un dossier .next créé
ls -la .next
```

### 4.4 Lancer le frontend en production

#### Option A : Avec PM2 (Recommandé)

```bash
# Lancer avec PM2
pm2 start npm --name footballhub-frontend -- start

# Vérifier
pm2 status

# Sauvegarder
pm2 save
```

#### Option B : Via l'interface cPanel

1. Ouvrir **Setup Node.js App** dans cPanel
2. Cliquer sur **Create Application**
3. Configurer :
   - **Node.js version** : 18.x ou supérieur
   - **Application mode** : Production
   - **Application root** : `repositories/supfootball/web`
   - **Application URL** : `votre-domaine.com`
   - **Application startup file** : `node_modules/next/dist/bin/next`
   - **Application startup command** : `start`
4. Ajouter les variables d'environnement (voir section 4.2)
5. Cliquer sur **Create**

---

## 🚀 PHASE 5 : Configuration du serveur web (Apache/Nginx)

### 5.1 Configuration d'un reverse proxy (si nécessaire)

Si vous utilisez Apache (par défaut sur cPanel), créez un fichier `.htaccess` :

```bash
# Dans le dossier public_html ou le dossier de votre domaine
cd ~/public_html
nano .htaccess
```

**Contenu du `.htaccess` pour le frontend :**

```apache
# Activer le module de réécriture
RewriteEngine On

# Rediriger toutes les requêtes vers l'application Node.js
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Headers de sécurité
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
```

**Pour l'API (sous-domaine api.votre-domaine.com) :**

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:5000/$1 [P,L]
```

### 5.2 Configuration SSL (HTTPS)

1. Dans cPanel, aller dans **SSL/TLS Status**
2. Activer **AutoSSL** pour votre domaine
3. Ou installer un certificat Let's Encrypt manuellement

---

## 🚀 PHASE 6 : Vérification et tests

### 6.1 Vérifier que les services tournent

```bash
# Vérifier PM2
pm2 status

# Vérifier les logs du backend
pm2 logs footballhub-backend --lines 50

# Vérifier les logs du frontend
pm2 logs footballhub-frontend --lines 50
```

### 6.2 Tester l'API

```bash
# Tester l'endpoint de santé
curl https://api.votre-domaine.com/api/health

# Ou depuis votre navigateur
# https://api.votre-domaine.com/api/health
```

### 6.3 Tester le frontend

Ouvrir votre navigateur et aller sur :
- `https://votre-domaine.com`

Vérifier que :
- ✅ La page d'accueil s'affiche correctement
- ✅ Les données sont chargées depuis l'API
- ✅ L'authentification fonctionne
- ✅ Les WebSockets fonctionnent (scores en direct)

---

## 🚀 PHASE 7 : Automatisation et maintenance

### 7.1 Script de déploiement automatique

Créer un script pour faciliter les mises à jour :

```bash
# Créer le script
cd ~/repositories/supfootball
nano deploy.sh
```

**Contenu du `deploy.sh` :**

```bash
#!/bin/bash

echo "🚀 Déploiement de FootballHub+ sur cPanel"
echo "=========================================="

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Pull les dernières modifications
echo -e "${BLUE}📥 Récupération des dernières modifications...${NC}"
git pull origin main

# 2. Backend
echo -e "${BLUE}🔧 Mise à jour du Backend...${NC}"
cd backend
npm install --production
pm2 restart footballhub-backend
echo -e "${GREEN}✅ Backend mis à jour${NC}"

# 3. Frontend
echo -e "${BLUE}🎨 Mise à jour du Frontend...${NC}"
cd ../web
npm install --legacy-peer-deps
npm run build
pm2 restart footballhub-frontend
echo -e "${GREEN}✅ Frontend mis à jour${NC}"

# 4. Vérification
echo -e "${BLUE}🔍 Vérification des services...${NC}"
pm2 status

echo -e "${GREEN}✅ Déploiement terminé !${NC}"
```

**Rendre le script exécutable :**

```bash
chmod +x deploy.sh
```

**Utilisation :**

```bash
# Pour déployer les mises à jour
./deploy.sh
```

### 7.2 Configuration des CRON jobs

Pour les tâches planifiées (synchronisation des données, etc.) :

1. Dans cPanel, aller dans **Cron Jobs**
2. Ajouter un nouveau cron job :

```bash
# Exemple : Synchroniser les matchs toutes les heures
0 * * * * cd ~/repositories/supfootball/backend && node src/scripts/syncMatches.js
```

### 7.3 Monitoring et logs

```bash
# Voir tous les logs PM2
pm2 logs

# Voir les logs d'une app spécifique
pm2 logs footballhub-backend

# Voir les métriques
pm2 monit

# Redémarrer une app
pm2 restart footballhub-backend

# Arrêter une app
pm2 stop footballhub-backend

# Supprimer une app
pm2 delete footballhub-backend
```

---

## 🔧 Dépannage

### Problème : MongoDB ne se connecte pas

**Solution :**
1. Vérifier que l'IP du serveur est autorisée dans MongoDB Atlas
2. Vérifier que le `MONGODB_URI` est correct dans le `.env`
3. Tester la connexion :
   ```bash
   curl ifconfig.me
   # Ajouter cette IP dans MongoDB Atlas
   ```

### Problème : Le frontend affiche une page blanche

**Solution :**
1. Vérifier les logs :
   ```bash
   pm2 logs footballhub-frontend
   ```
2. Vérifier que `NEXT_PUBLIC_API_URL` est correct
3. Rebuild le frontend :
   ```bash
   cd ~/repositories/supfootball/web
   npm run build
   pm2 restart footballhub-frontend
   ```

### Problème : Erreur 502 Bad Gateway

**Solution :**
1. Vérifier que l'application tourne :
   ```bash
   pm2 status
   ```
2. Vérifier les ports dans le `.htaccess`
3. Redémarrer les services :
   ```bash
   pm2 restart all
   ```

### Problème : Les WebSockets ne fonctionnent pas

**Solution :**
1. Vérifier que le port WebSocket est ouvert
2. Configurer le reverse proxy pour supporter WebSocket :
   ```apache
   # Dans .htaccess
   RewriteEngine On
   RewriteCond %{HTTP:Upgrade} websocket [NC]
   RewriteCond %{HTTP:Connection} upgrade [NC]
   RewriteRule ^(.*)$ ws://localhost:5000/$1 [P,L]
   ```

---

## 📊 Checklist finale

Avant de considérer le déploiement terminé :

- [ ] Backend déployé et accessible
- [ ] Frontend déployé et accessible
- [ ] MongoDB connecté avec succès
- [ ] Variables d'environnement configurées
- [ ] SSL/HTTPS activé
- [ ] PM2 configuré pour redémarrer au boot
- [ ] Tests de l'API réussis
- [ ] Tests du frontend réussis
- [ ] WebSockets fonctionnels
- [ ] Authentification fonctionnelle
- [ ] Paiements testés (si applicable)
- [ ] CRON jobs configurés
- [ ] Script de déploiement créé
- [ ] Documentation mise à jour

---

## 📚 Ressources utiles

- [Documentation cPanel](https://docs.cpanel.net/)
- [Documentation PM2](https://pm2.keymetrics.io/docs/)
- [Documentation Next.js Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Network Access](https://www.mongodb.com/docs/atlas/security/ip-access-list/)

---

## 🎉 Félicitations !

Votre application FootballHub+ est maintenant déployée sur cPanel et prête à être utilisée en production !

**Prochaines étapes :**
1. Configurer le monitoring (Sentry, LogRocket, etc.)
2. Mettre en place des backups automatiques
3. Optimiser les performances
4. Configurer un CDN pour les assets statiques
5. Mettre en place des tests automatisés

---

**Besoin d'aide ?** Consultez les logs avec `pm2 logs` ou contactez le support de votre hébergeur.
