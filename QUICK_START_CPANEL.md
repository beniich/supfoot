# 🚀 Guide Rapide - Déploiement cPanel

## ⚡ Démarrage rapide (5 minutes)

### 1️⃣ Connexion SSH

```bash
ssh votre_utilisateur@votre_domaine.com
```

### 2️⃣ Cloner le projet

```bash
cd ~
mkdir -p repositories
cd repositories
git clone https://github.com/VOTRE_USERNAME/supfootball.git
cd supfootball
```

### 3️⃣ Configurer MongoDB Atlas

```bash
# Obtenir l'IP du serveur
curl ifconfig.me

# Ajouter cette IP dans MongoDB Atlas :
# https://cloud.mongodb.com → Network Access → Add IP Address
```

### 4️⃣ Configurer le Backend

```bash
cd backend
cp .env.example .env
nano .env  # Modifier les variables (voir ci-dessous)
npm install --production
```

**Variables essentielles dans `.env` :**
```env
MONGODB_URI=mongodb+srv://cloudinstall9:1985%40Trbm@yofoot.awptx0z.mongodb.net/?appName=yofoot
NODE_ENV=production
PORT=5000
JWT_SECRET=changez_moi_avec_une_cle_forte
CORS_ORIGIN=https://votre-domaine.com
```

### 5️⃣ Lancer le Backend

```bash
# Installer PM2 si pas déjà fait
npm install -g pm2

# Lancer le backend
pm2 start src/index.js --name footballhub-backend
pm2 save
pm2 startup  # Suivre les instructions
```

### 6️⃣ Configurer le Frontend

```bash
cd ../web
cp .env.local.example .env.local
nano .env.local  # Modifier les variables
npm install --legacy-peer-deps
npm run build
```

**Variables essentielles dans `.env.local` :**
```env
NEXT_PUBLIC_API_URL=https://api.votre-domaine.com
NEXT_PUBLIC_WS_URL=wss://api.votre-domaine.com
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

### 7️⃣ Lancer le Frontend

```bash
pm2 start npm --name footballhub-frontend -- start
pm2 save
```

### 8️⃣ Vérifier

```bash
pm2 status
pm2 logs
```

---

## 🔧 Commandes utiles

### Déploiement rapide

```bash
# Depuis la racine du projet
chmod +x deploy.sh
./deploy.sh all
```

### Gestion PM2

```bash
# Voir le statut
pm2 status

# Voir les logs
pm2 logs

# Redémarrer
pm2 restart all

# Arrêter
pm2 stop all

# Supprimer
pm2 delete all
```

### Mise à jour

```bash
cd ~/repositories/supfootball
git pull origin main
./deploy.sh all
```

---

## 🆘 Dépannage rapide

### Backend ne démarre pas ?

```bash
cd ~/repositories/supfootball/backend
pm2 logs footballhub-backend
# Vérifier les erreurs MongoDB, JWT_SECRET, etc.
```

### Frontend affiche une page blanche ?

```bash
cd ~/repositories/supfootball/web
npm run build
pm2 restart footballhub-frontend
pm2 logs footballhub-frontend
```

### MongoDB ne se connecte pas ?

```bash
# Vérifier l'IP
curl ifconfig.me
# Ajouter dans MongoDB Atlas → Network Access
```

---

## 📋 Checklist de déploiement

- [ ] SSH connecté
- [ ] Projet cloné depuis GitHub
- [ ] IP ajoutée dans MongoDB Atlas
- [ ] `.env` configuré (backend)
- [ ] `.env.local` configuré (frontend)
- [ ] Backend démarré avec PM2
- [ ] Frontend buildé et démarré
- [ ] PM2 configuré pour auto-start
- [ ] Tests réussis

---

## 🔗 Liens utiles

- **Documentation complète** : Voir `PLAN_DEPLOIEMENT_CPANEL.md`
- **Guide MongoDB** : Voir `GUIDE_CONNEXION_CPANEL.md`
- **PM2 Docs** : https://pm2.keymetrics.io/docs/

---

## 📞 Support

En cas de problème :
1. Vérifier les logs : `pm2 logs`
2. Consulter la documentation complète
3. Vérifier la configuration MongoDB Atlas
4. Contacter le support de votre hébergeur cPanel
