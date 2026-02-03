# 🎯 Plan de Déploiement cPanel - Synthèse Exécutive

## ✅ Ce qui a été préparé

Votre application **FootballHub+** est maintenant prête à être déployée sur cPanel. Tous les fichiers de configuration et scripts nécessaires ont été créés.

---

## 📦 Fichiers créés pour le déploiement

### 📚 Documentation
- ✅ **DEPLOIEMENT_README.md** - Documentation principale
- ✅ **QUICK_START_CPANEL.md** - Guide rapide (5 min)
- ✅ **PLAN_DEPLOIEMENT_CPANEL.md** - Plan détaillé complet
- ✅ **GUIDE_CONNEXION_CPANEL.md** - Configuration MongoDB (déjà existant)
- ✅ **GUIDE_SOUS_DOMAINE_API.md** - Configuration sous-domaine API

### 🔧 Scripts d'automatisation
- ✅ **deploy.sh** - Script de déploiement automatique
- ✅ **update.sh** - Script de mise à jour
- ✅ **check-environment.sh** - Script de vérification

### ⚙️ Configuration
- ✅ **.cpanel.yml** - Configuration Git Deploy cPanel
- ✅ **.htaccess.example** - Configuration Apache/Reverse Proxy
- ✅ **backend/.env.example** - Variables d'environnement backend
- ✅ **web/.env.local.example** - Variables d'environnement frontend

---

## 🚀 Prochaines étapes (sur votre machine locale)

### 1. Pousser sur GitHub

```bash
# Depuis votre terminal PowerShell
cd "c:\Users\pc gold\projet dash\supfoot\supfootball"

# Ajouter tous les nouveaux fichiers
git add .

# Commit
git commit -m "Ajout configuration déploiement cPanel"

# Push vers GitHub
git push origin main
```

### 2. Se connecter à cPanel

```bash
# Via SSH (remplacez par vos informations)
ssh votre_utilisateur@votre_domaine.com
```

### 3. Suivre le guide rapide

Une fois connecté en SSH, suivez le fichier **QUICK_START_CPANEL.md** :

```bash
# Cloner le projet
cd ~
mkdir -p repositories
cd repositories
git clone https://github.com/VOTRE_USERNAME/supfootball.git
cd supfootball

# Vérifier l'environnement
chmod +x check-environment.sh
./check-environment.sh

# Déployer
chmod +x deploy.sh
./deploy.sh all
```

---

## 📋 Checklist avant déploiement

### Sur GitHub
- [ ] Code pushé avec tous les fichiers de configuration
- [ ] Repository accessible (public ou token configuré)

### Sur MongoDB Atlas
- [ ] Cluster MongoDB créé
- [ ] Utilisateur de base de données créé
- [ ] URI de connexion disponible
- [ ] IP du serveur cPanel autorisée (à faire après connexion SSH)

### Sur cPanel
- [ ] Accès SSH activé
- [ ] Node.js disponible (version 18+)
- [ ] Git installé
- [ ] Domaine ou sous-domaine configuré

---

## 🎯 Architecture de déploiement

```
┌─────────────────────────────────────────────────────────┐
│                    VOTRE DOMAINE                        │
│                 https://votre-domaine.com               │
└─────────────────────────────────────────────────────────┘
                            │
                            ├─── Frontend (Next.js)
                            │    Port 3000 (PM2)
                            │    
                            └─── API Backend (Node.js)
                                 https://api.votre-domaine.com
                                 Port 5000 (PM2)
                                 │
                                 └─── MongoDB Atlas (Cloud)
```

---

## 🔑 Configuration minimale requise

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://cloudinstall9:1985%40Trbm@yofoot.awptx0z.mongodb.net/?appName=yofoot
NODE_ENV=production
PORT=5000
JWT_SECRET=CHANGEZ_MOI_AVEC_UNE_CLE_FORTE
CORS_ORIGIN=https://votre-domaine.com
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.votre-domaine.com
NEXT_PUBLIC_WS_URL=wss://api.votre-domaine.com
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

---

## ⏱️ Temps estimé

- **Préparation locale** : 5 minutes (push sur GitHub)
- **Configuration cPanel** : 10 minutes (SSH, clonage, configuration)
- **Déploiement** : 15 minutes (installation, build, démarrage)
- **Tests et vérification** : 10 minutes

**Total : ~40 minutes**

---

## 🆘 Support et dépannage

### En cas de problème

1. **Vérifier les logs**
   ```bash
   pm2 logs
   ```

2. **Utiliser le script de vérification**
   ```bash
   ./check-environment.sh
   ```

3. **Consulter la documentation**
   - QUICK_START_CPANEL.md
   - PLAN_DEPLOIEMENT_CPANEL.md

4. **Vérifier MongoDB Atlas**
   - IP autorisée ?
   - URI correcte ?

---

## 🎉 Après le déploiement

Une fois déployé avec succès :

### ✅ Votre application sera accessible sur :
- **Frontend** : https://votre-domaine.com
- **API** : https://api.votre-domaine.com

### 🔄 Pour les mises à jour futures :
```bash
# Sur votre machine locale
git add .
git commit -m "Mise à jour"
git push origin main

# Sur le serveur cPanel
cd ~/repositories/supfootball
./update.sh all
```

### 📊 Monitoring :
```bash
# Voir le statut
pm2 status

# Voir les logs en temps réel
pm2 logs

# Voir les métriques
pm2 monit
```

---

## 📞 Ressources

- **Documentation cPanel** : https://docs.cpanel.net/
- **Documentation PM2** : https://pm2.keymetrics.io/
- **MongoDB Atlas** : https://cloud.mongodb.com
- **Next.js Deployment** : https://nextjs.org/docs/deployment

---

## 🎯 Résumé en 3 points

1. **Pousser sur GitHub** ✅ (Déjà fait avec Vercel)
2. **Cloner sur cPanel** → `git clone` + configuration
3. **Déployer** → `./deploy.sh all`

**C'est tout ! Votre application sera en ligne.**

---

**Date de création** : 2026-02-03  
**Version** : 1.0.0  
**Statut** : ✅ Prêt pour le déploiement
