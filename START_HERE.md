# 🎯 DÉMARRAGE RAPIDE - Déploiement cPanel avec SSH

## ✅ Vous avez déjà :
- ✅ Application sur GitHub
- ✅ Application sur Vercel (fonctionne bien)
- ✅ Clé SSH configurée sur le serveur cPanel
- ✅ Utilisateur : `cldindustry`

---

## 🚀 OPTION 1 : Utiliser le Terminal cPanel (Plus Simple)

### 1️⃣ Ouvrir le Terminal cPanel

1. Connectez-vous à votre **cPanel**
2. Cherchez **Terminal** dans les outils
3. Cliquez pour ouvrir

### 2️⃣ Obtenir l'IP pour MongoDB

```bash
curl ifconfig.me
```

**Copiez cette IP et ajoutez-la dans MongoDB Atlas :**
- https://cloud.mongodb.com
- Network Access → Add IP Address

### 3️⃣ Cloner le projet

```bash
cd ~
mkdir -p repositories
cd repositories
git clone https://github.com/VOTRE_USERNAME/supfootball.git
cd supfootball
```

### 4️⃣ Configurer et déployer

```bash
# Rendre les scripts exécutables
chmod +x deploy.sh update.sh check-environment.sh

# Vérifier l'environnement
./check-environment.sh

# Configurer le backend
cp backend/.env.example backend/.env
nano backend/.env
# Modifiez les valeurs (voir ci-dessous)
# Ctrl+O pour sauvegarder, Ctrl+X pour quitter

# Configurer le frontend
cp web/.env.local.example web/.env.local
nano web/.env.local
# Modifiez les valeurs (voir ci-dessous)
# Ctrl+O pour sauvegarder, Ctrl+X pour quitter

# Déployer tout
./deploy.sh all
```

### 5️⃣ Vérifier

```bash
pm2 status
pm2 logs
```

---

## 🚀 OPTION 2 : Depuis Windows avec PowerShell

### 1️⃣ Récupérer la clé SSH

**Dans le terminal cPanel :**
```bash
cat ~/.ssh/id_rsa_supfoot
```

**Sur Windows PowerShell :**
```powershell
# Créer le dossier .ssh
mkdir "$env:USERPROFILE\.ssh" -Force

# Ouvrir le bloc-notes
notepad "$env:USERPROFILE\.ssh\id_rsa_supfoot"
```

Collez le contenu de la clé (tout, de `-----BEGIN` à `-----END-----`)

### 2️⃣ Configurer SSH

```powershell
# Créer le fichier config
notepad "$env:USERPROFILE\.ssh\config"
```

**Contenu :**
```
Host supfoot-cpanel
    HostName votre-domaine.com
    User cldindustry
    IdentityFile ~/.ssh/id_rsa_supfoot
    Port 22
```

### 3️⃣ Utiliser le script PowerShell

```powershell
cd "c:\Users\pc gold\projet dash\supfoot\supfootball"

# Modifier le script avec votre domaine
notepad deploy-cpanel.ps1
# Changez: $SSH_HOST = "votre-domaine.com"

# Exécuter le script
.\deploy-cpanel.ps1
```

---

## ⚙️ Configuration minimale requise

### Backend (.env)

```env
MONGODB_URI=mongodb+srv://cloudinstall9:1985%40Trbm@yofoot.awptx0z.mongodb.net/?appName=yofoot
NODE_ENV=production
PORT=5000
JWT_SECRET=changez_moi_avec_une_cle_forte_minimum_32_caracteres
CORS_ORIGIN=https://votre-domaine.com
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=https://api.votre-domaine.com
NEXT_PUBLIC_WS_URL=wss://api.votre-domaine.com
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

---

## 🔧 Commandes utiles

### Sur le serveur cPanel

```bash
# Voir le statut
pm2 status

# Voir les logs
pm2 logs

# Redémarrer tout
pm2 restart all

# Mettre à jour depuis GitHub
cd ~/repositories/supfootball
./update.sh all

# Vérifier l'environnement
./check-environment.sh
```

### Depuis Windows

```powershell
# Connexion SSH
ssh supfoot-cpanel

# Ou avec le script
.\deploy-cpanel.ps1
```

---

## 📋 Checklist complète

### Avant de commencer
- [ ] Code pushé sur GitHub
- [ ] Accès cPanel disponible
- [ ] MongoDB Atlas configuré

### Sur MongoDB Atlas
- [ ] Obtenir l'IP du serveur : `curl ifconfig.me`
- [ ] Ajouter l'IP dans Network Access

### Configuration
- [ ] Projet cloné sur le serveur
- [ ] `backend/.env` configuré
- [ ] `web/.env.local` configuré
- [ ] Scripts rendus exécutables

### Déploiement
- [ ] `./deploy.sh all` exécuté
- [ ] Backend démarré (PM2)
- [ ] Frontend démarré (PM2)
- [ ] PM2 configuré pour auto-start

### Vérification
- [ ] `pm2 status` → tout en ligne
- [ ] API accessible
- [ ] Frontend accessible
- [ ] Pas d'erreurs dans les logs

---

## 🎯 Résumé en 3 commandes

```bash
# 1. Cloner
git clone https://github.com/VOTRE_USERNAME/supfootball.git ~/repositories/supfootball

# 2. Configurer
cd ~/repositories/supfootball && chmod +x *.sh && cp backend/.env.example backend/.env && cp web/.env.local.example web/.env.local

# 3. Déployer
./deploy.sh all
```

**N'oubliez pas de modifier les fichiers `.env` avant de déployer !**

---

## 🆘 Besoin d'aide ?

1. **Vérifier l'environnement** : `./check-environment.sh`
2. **Voir les logs** : `pm2 logs`
3. **Consulter la doc** : Voir les fichiers `GUIDE_*.md`
4. **Redémarrer** : `pm2 restart all`

---

## 📞 Documentation complète

- **DEPLOIEMENT_README.md** - Vue d'ensemble
- **QUICK_START_CPANEL.md** - Guide rapide
- **PLAN_DEPLOIEMENT_CPANEL.md** - Plan détaillé
- **GUIDE_SSH_CONNEXION.md** - Configuration SSH
- **GUIDE_SOUS_DOMAINE_API.md** - Configuration API

---

**🎉 Votre application sera en ligne en moins de 30 minutes !**
