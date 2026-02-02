# Guide de Connexion cPanel -> MongoDB Atlas

Ce guide vous explique comment connecter votre application Node.js sur cPanel à votre base de données MongoDB Atlas.

## Étape 1 : Obtenir l'IP de votre serveur cPanel

1. Connectez-vous à votre **Terminal cPanel**.
2. Tapez la commande suivante pour connaître l'adresse IP de sortie de votre serveur :
   ```bash
   curl ifconfig.me
   ```
3. Copiez cette adresse IP (ex: `192.168.1.50`).

## Étape 2 : Autoriser l'IP dans MongoDB Atlas

1. Allez sur le site [MongoDB Atlas](https://cloud.mongodb.com).
2. Connectez-vous et sélectionnez votre projet.
3. Dans le menu de gauche, cliquez sur **Network Access** (sous la section "Security").
4. Cliquez sur le bouton vert **+ ADD IP ADDRESS**.
5. Collez l'adresse IP que vous avez copiée à l'étape 1.
6. Ajoutez une description (ex: "Serveur cPanel") et validez.
   > *Note : Si vous voulez tester rapidement sans chercher l'IP, vous pouvez cliquer sur "Allow Access from Anywhere", mais c'est moins sécurisé.*

## Étape 3 : Configurer l'application Node.js sur cPanel

Il y a deux façons de faire, la plus simple est via l'interface graphique "Setup Node.js App".

### Méthode Recommandée (Interface cPanel)
1. Dans cPanel, ouvrez l'outi **Setup Node.js App**.
2. Cliquez sur l'icône "Crayon" (Edit) à côté de votre application.
3. Repérez la section **Environment variables**.
4. Cliquez sur **ADD VARIABLE**.
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://cloudinstall9:1985%40Trbm@yofoot.awptx0z.mongodb.net/?appName=yofoot`
5. Ajoutez une autre variable si vous êtes en production :
   - **Name**: `NODE_ENV`
   - **Value**: `production`
6. Cliquez sur **Save**.
7. Cliquez sur **Restart** pour relancer l'application.

### Méthode via Terminal (si vous préférez)
Si vous ne passez pas par l'interface Node.js App, vous pouvez créer un fichier `.env` à la racine de votre dossier backend sur le serveur.

1. Dans le terminal cPanel, allez dans le dossier de votre backend :
   ```bash
   cd repositories/supfoot/backend  # (Adaptez le chemin selon votre installation)
   ```
2. Créez ou éditez le fichier `.env` :
   ```bash
   nano .env
   ```
3. Collez le contenu suivant :
   ```env
   MONGODB_URI=mongodb+srv://cloudinstall9:1985%40Trbm@yofoot.awptx0z.mongodb.net/?appName=yofoot
   NODE_ENV=production
   PORT=5000
   ```
4. Appuyez sur `Ctrl+O` pour sauvegarder, puis `Entrée`, et `Ctrl+X` pour quitter.
5. Redémarrez votre application (via l'interface cPanel ou PM2 si vous l'utilisez).

## Étape 4 : Vérification

Si l'application ne démarre pas, vérifiez les logs. Dans le terminal cPanel :
```bash
cat stderr.log
```
Si vous voyez "MongoDB connected successfully", c'est gagné !
