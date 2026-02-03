# 📚 Documentation de Déploiement cPanel - FootballHub+

## 📖 Table des matières

1. **[QUICK_START_CPANEL.md](./QUICK_START_CPANEL.md)** - Guide de démarrage rapide (5 min)
2. **[PLAN_DEPLOIEMENT_CPANEL.md](./PLAN_DEPLOIEMENT_CPANEL.md)** - Plan complet et détaillé
3. **[GUIDE_CONNEXION_CPANEL.md](./GUIDE_CONNEXION_CPANEL.md)** - Configuration MongoDB Atlas

## 🚀 Déploiement en 3 étapes

### Étape 1 : Préparation (sur votre machine locale)

```bash
# 1. Pousser votre code sur GitHub (déjà fait ✓)
git add .
git commit -m "Préparation déploiement cPanel"
git push origin main

# 2. Vérifier que tous les fichiers de configuration sont présents
# ✓ backend/.env.example
# ✓ web/.env.local.example
# ✓ deploy.sh
# ✓ .cpanel.yml
```

### Étape 2 : Configuration MongoDB Atlas

1. Aller sur https://cloud.mongodb.com
2. Network Access → Add IP Address
3. Ajouter l'IP de votre serveur cPanel (obtenue avec `curl ifconfig.me`)

### Étape 3 : Déploiement sur cPanel

```bash
# 1. Se connecter en SSH
ssh votre_utilisateur@votre_domaine.com

# 2. Cloner le projet
cd ~
mkdir -p repositories
cd repositories
git clone https://github.com/VOTRE_USERNAME/supfootball.git
cd supfootball

# 3. Vérifier l'environnement
chmod +x check-environment.sh
./check-environment.sh

# 4. Configurer et déployer
chmod +x deploy.sh
./deploy.sh all
```

## 📁 Structure des fichiers de déploiement

```
supfootball/
├── 📄 QUICK_START_CPANEL.md          # Guide rapide
├── 📄 PLAN_DEPLOIEMENT_CPANEL.md     # Plan détaillé
├── 📄 GUIDE_CONNEXION_CPANEL.md      # Guide MongoDB
├── 🔧 deploy.sh                       # Script de déploiement
├── 🔧 check-environment.sh            # Script de vérification
├── ⚙️ .cpanel.yml                     # Config Git Deploy cPanel
├── ⚙️ .htaccess.example               # Config Apache
├── backend/
│   ├── 📄 .env.example                # Variables backend
│   └── ...
└── web/
    ├── 📄 .env.local.example          # Variables frontend
    └── ...
```

## 🔑 Variables d'environnement essentielles

### Backend (.env)

```env
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
PORT=5000
JWT_SECRET=votre_cle_secrete
CORS_ORIGIN=https://votre-domaine.com
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=https://api.votre-domaine.com
NEXT_PUBLIC_WS_URL=wss://api.votre-domaine.com
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

## 🛠️ Scripts disponibles

### Script de déploiement

```bash
# Déployer tout
./deploy.sh all

# Déployer seulement le backend
./deploy.sh backend

# Déployer seulement le frontend
./deploy.sh frontend
```

### Script de vérification

```bash
# Vérifier l'environnement
./check-environment.sh
```

### Commandes PM2

```bash
# Voir le statut
pm2 status

# Voir les logs
pm2 logs

# Redémarrer
pm2 restart all

# Arrêter
pm2 stop all
```

## 🔍 Vérification du déploiement

### 1. Vérifier les services

```bash
pm2 status
```

Vous devriez voir :
- ✅ footballhub-backend (online)
- ✅ footballhub-frontend (online)

### 2. Tester l'API

```bash
curl https://api.votre-domaine.com/api/health
```

### 3. Tester le frontend

Ouvrir dans le navigateur : `https://votre-domaine.com`

## 🆘 Dépannage

### Problème : MongoDB ne se connecte pas

**Solution :**
```bash
# 1. Vérifier l'IP
curl ifconfig.me

# 2. Ajouter dans MongoDB Atlas → Network Access

# 3. Vérifier le .env
cat backend/.env | grep MONGODB_URI
```

### Problème : Page blanche sur le frontend

**Solution :**
```bash
# 1. Vérifier les logs
pm2 logs footballhub-frontend

# 2. Rebuild
cd ~/repositories/supfootball/web
npm run build
pm2 restart footballhub-frontend
```

### Problème : Erreur 502

**Solution :**
```bash
# 1. Vérifier que les services tournent
pm2 status

# 2. Redémarrer
pm2 restart all

# 3. Vérifier les ports
netstat -tuln | grep -E ':(3000|5000)'
```

## 📊 Checklist de déploiement

- [ ] Code pushé sur GitHub
- [ ] IP ajoutée dans MongoDB Atlas
- [ ] Projet cloné sur cPanel
- [ ] `.env` configuré (backend)
- [ ] `.env.local` configuré (frontend)
- [ ] Dépendances installées
- [ ] Backend démarré avec PM2
- [ ] Frontend buildé et démarré
- [ ] PM2 configuré pour auto-start
- [ ] SSL/HTTPS activé
- [ ] Tests réussis

## 🔗 Ressources

- **Documentation cPanel** : https://docs.cpanel.net/
- **Documentation PM2** : https://pm2.keymetrics.io/docs/
- **Documentation Next.js** : https://nextjs.org/docs/deployment
- **MongoDB Atlas** : https://cloud.mongodb.com

## 📞 Support

En cas de problème :
1. Consulter les logs : `pm2 logs`
2. Vérifier la documentation complète
3. Utiliser le script de vérification : `./check-environment.sh`
4. Contacter le support de votre hébergeur

## 🎉 Félicitations !

Une fois le déploiement terminé, votre application FootballHub+ sera accessible sur :
- **Frontend** : https://votre-domaine.com
- **API** : https://api.votre-domaine.com

---

**Dernière mise à jour** : 2026-02-03
**Version** : 1.0.0
