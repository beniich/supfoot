# 🔐 Guide de Connexion SSH au serveur cPanel

## 📋 Informations de votre clé SSH

Votre clé SSH a été générée avec succès sur le serveur :
- **Clé privée** : `/home/cldindustry/.ssh/id_rsa_supfoot`
- **Clé publique** : `/home/cldindustry/.ssh/id_rsa_supfoot.pub`
- **Utilisateur** : `cldindustry`
- **Fingerprint** : `SHA256:K0xN8WQInMKItE2qHRsVaptP96I3krB4GA5kPVSlSBg`

---

## 🚀 Méthode 1 : Connexion SSH depuis Windows (PowerShell)

### Étape 1 : Récupérer la clé privée

Vous devez d'abord télécharger la clé privée depuis le serveur vers votre machine Windows.

**Option A : Via cPanel File Manager**
1. Connectez-vous à cPanel
2. Ouvrez **File Manager**
3. Naviguez vers `.ssh/`
4. Téléchargez le fichier `id_rsa_supfoot`
5. Sauvegardez-le dans `C:\Users\pc gold\.ssh\id_rsa_supfoot`

**Option B : Via le terminal cPanel**
```bash
# Afficher le contenu de la clé privée
cat ~/.ssh/id_rsa_supfoot

# Copiez tout le contenu (de -----BEGIN RSA PRIVATE KEY----- à -----END RSA PRIVATE KEY-----)
```

Puis créez le fichier sur Windows :
```powershell
# Créer le dossier .ssh si nécessaire
mkdir "$env:USERPROFILE\.ssh" -Force

# Ouvrir le bloc-notes pour coller la clé
notepad "$env:USERPROFILE\.ssh\id_rsa_supfoot"
```

### Étape 2 : Configurer les permissions (Windows)

```powershell
# Définir les permissions appropriées
icacls "$env:USERPROFILE\.ssh\id_rsa_supfoot" /inheritance:r
icacls "$env:USERPROFILE\.ssh\id_rsa_supfoot" /grant:r "$env:USERNAME:R"
```

### Étape 3 : Créer un fichier de configuration SSH

```powershell
# Créer le fichier config
notepad "$env:USERPROFILE\.ssh\config"
```

**Contenu du fichier `config` :**
```
Host supfoot-cpanel
    HostName votre-domaine.com
    User cldindustry
    IdentityFile ~/.ssh/id_rsa_supfoot
    Port 22
```

**Remplacez `votre-domaine.com` par votre vrai domaine ou l'IP du serveur.**

### Étape 4 : Se connecter

```powershell
# Connexion SSH
ssh supfoot-cpanel

# Ou directement
ssh -i "$env:USERPROFILE\.ssh\id_rsa_supfoot" cldindustry@votre-domaine.com
```

---

## 🚀 Méthode 2 : Utiliser le terminal cPanel directement

Si vous préférez utiliser le terminal intégré de cPanel :

1. Connectez-vous à **cPanel**
2. Cherchez **Terminal** dans les outils
3. Cliquez pour ouvrir le terminal
4. Vous êtes déjà connecté en tant que `cldindustry`

---

## 🔧 Configuration de la clé SSH pour GitHub (optionnel)

Si vous voulez que le serveur puisse pull depuis GitHub automatiquement :

### Étape 1 : Afficher la clé publique

```bash
cat ~/.ssh/id_rsa_supfoot.pub
```

### Étape 2 : Ajouter la clé à GitHub

1. Copiez le contenu de la clé publique
2. Allez sur GitHub → Settings → SSH and GPG keys
3. Cliquez sur **New SSH key**
4. Collez la clé publique
5. Donnez-lui un nom (ex: "cPanel Server")

### Étape 3 : Tester la connexion

```bash
ssh -T git@github.com
```

### Étape 4 : Configurer Git

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre@email.com"
```

---

## 📦 Déploiement automatisé avec SSH

Une fois connecté en SSH, vous pouvez exécuter les commandes de déploiement.

### Première installation

```bash
# 1. Aller dans le répertoire home
cd ~

# 2. Créer le dossier repositories
mkdir -p repositories
cd repositories

# 3. Cloner le projet depuis GitHub
git clone git@github.com:VOTRE_USERNAME/supfootball.git
# OU avec HTTPS si SSH pas configuré
git clone https://github.com/VOTRE_USERNAME/supfootball.git

# 4. Aller dans le projet
cd supfootball

# 5. Rendre les scripts exécutables
chmod +x deploy.sh update.sh check-environment.sh

# 6. Vérifier l'environnement
./check-environment.sh

# 7. Configurer les variables d'environnement
cp backend/.env.example backend/.env
nano backend/.env  # Modifier les valeurs

cp web/.env.local.example web/.env.local
nano web/.env.local  # Modifier les valeurs

# 8. Déployer
./deploy.sh all
```

---

## 🔄 Mises à jour futures

```bash
# Se connecter en SSH
ssh supfoot-cpanel

# Mettre à jour
cd ~/repositories/supfootball
./update.sh all
```

---

## 🆘 Dépannage SSH

### Problème : Permission denied (publickey)

**Solution :**
```bash
# Vérifier que la clé est bien ajoutée
ssh-add -l

# Ajouter la clé manuellement
ssh-add ~/.ssh/id_rsa_supfoot
```

### Problème : Host key verification failed

**Solution :**
```bash
# Supprimer l'ancienne clé
ssh-keygen -R votre-domaine.com

# Reconnecter
ssh supfoot-cpanel
```

### Problème : Connection refused

**Solution :**
- Vérifiez que SSH est activé dans cPanel
- Vérifiez le port SSH (généralement 22, parfois 2222)
- Contactez votre hébergeur si le problème persiste

---

## 📋 Checklist de connexion SSH

- [ ] Clé SSH générée sur le serveur ✅
- [ ] Clé privée téléchargée sur Windows
- [ ] Permissions configurées
- [ ] Fichier config SSH créé
- [ ] Connexion SSH testée
- [ ] Clé publique ajoutée à GitHub (optionnel)
- [ ] Git configuré sur le serveur
- [ ] Projet cloné
- [ ] Scripts rendus exécutables

---

## 🎯 Commandes rapides

```bash
# Connexion
ssh supfoot-cpanel

# Vérifier le statut
pm2 status

# Voir les logs
pm2 logs

# Mettre à jour
cd ~/repositories/supfootball && ./update.sh all

# Redémarrer
pm2 restart all

# Vérifier l'environnement
cd ~/repositories/supfootball && ./check-environment.sh
```

---

## 🔐 Sécurité

### Bonnes pratiques :
1. ✅ Ne partagez JAMAIS votre clé privée
2. ✅ Utilisez une passphrase pour protéger la clé
3. ✅ Gardez votre clé privée en sécurité
4. ✅ Utilisez des clés SSH différentes pour différents serveurs
5. ✅ Révoquéz les clés compromises immédiatement

---

**Votre configuration SSH est prête ! Vous pouvez maintenant vous connecter et déployer votre application.**
