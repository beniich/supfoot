# Guide de Déploiement Next.js sur cPanel (Mode Standalone)

Ce guide détaille comment déployer l'application **Frontend (Next.js)** sur votre hébergement cPanel dans le dossier `/home/cldindustry/supfootball`.

## Préoccupations initiales

Vous avez déjà créé l'application Node.js dans cPanel et le chemin est `/home/cldindustry/supfootball`.

## Étape 1 : Préparer le Build Local

Sur votre ordinateur (Windows) :

1. Ouvrez votre terminal dans le dossier `web` du projet :
   ```powershell
   cd "c:\Users\pc gold\projet dash\supfoot\supfootball\web"
   ```

2. Lancez la compilation :
   ```powershell
   npm run build
   ```
   *Cela va créer un dossier `.next` contenant une version optimisée "standalone" de votre site.*

## Étape 2 : Préparer les fichiers à envoyer

Vous devez rassembler les fichiers nécessaires pour le serveur. 
Créez un dossier temporaire sur votre bureau ou ailleurs (ex: `deploy_package`) et copiez-y les éléments suivants :

1. **Le contenu du dossier Standalone** :
   - Allez dans `web\.next\standalone`
   - Copiez **tout le contenu** de ce dossier (dossiers `.next`, `node_modules`, `server.js`, `package.json`, etc.) vers votre dossier `deploy_package`.

2. **Les fichiers Statiques** (Indispensable pour le CSS et le JS client) :
   - Allez dans `web\.next\static`
   - Copiez le dossier `static`
   - Collez-le dans `deploy_package\.next\` (confirmez le remplacement/fusion si demandé).
   *Structure finale attendue : `deploy_package\.next\static\...`*

3. **Le dossier Public** (Images, icônes) :
   - Allez dans `web\public`
   - Copiez le dossier `public` entier dans `deploy_package`.

## Étape 3 : Envoyer sur cPanel

1. **Compresser** : Sélectionnez tous les fichiers dans `deploy_package` et créez une archive ZIP (ex: `app.zip`).
2. **Uploader** :
   - Connectez-vous au **Gestionnaire de fichiers** de cPanel.
   - Allez dans le dossier `/home/cldindustry/supfootball`.
   - **Supprimez** les anciens fichiers s'il y en a (sauf peut-être `node_modules` si vous voulez tenter de les garder, mais le build standalone a ses propres modules).
   - Cliquez sur **Charger** (Upload) et envoyez `app.zip`.
3. **Extraire** :
   - Faites un clic droit sur `app.zip` -> **Extract**.
   - Extrayez directement dans `/home/cldindustry/supfootball`.

## Étape 4 : Configuration Node.js

1. Allez dans l'outil **Setup Node.js App** de cPanel.
2. Modifiez votre application `supfootball`.
3. **Application startup file** : Saisissez `server.js` (c'est le fichier généré par Next.js standalone).
4. **Environment Variables** : Ajoutez/Vérifiez :
   - `NODE_ENV`: `production`
   - `PORT`: (Laissez cPanel gérer ou mettez le port assigné si connu, mais cPanel l'injecte souvent).
5. Cliquez sur **Save** puis **Restart**.

## Étape 5 : Vérification

- Ouvrez l'URL de votre application.
- Si vous avez une erreur 500 ou 503, vérifiez les logs (`stderr.log` dans le dossier) ou assurez-vous que vous avez bien copié le dossier `.next/static`.

---
**Note sur le Backend** : Si votre application utilise l'API Express (`backend/`), elle doit être déployée séparément (autre dossier, autre port) ou intégrée via un serveur personnalisé, mais la méthode standalone ci-dessus ne concerne que le partie **Web Frontend**.
