# Guide d'Export Statique (Solution Basse Consommation)

Si votre serveur cPanel a peu de mémoire ("Out of Memory") ou si vous voulez éviter de configurer Node.js, cette méthode est idéale.

C'est une méthode **"Statique"** : le site est pré-construit sur votre ordinateur et envoyé comme un simple site HTML. Cela ne consomme **aucune ressource spéciale** sur le serveur.

## Prérequis

J'ai déjà configuré votre projet pour ce mode :
- `next.config.ts` est sur `output: 'export'`.
- L'optimisation des images est désactivée (car incompatible sans serveur Node).

## Étape 1 : Générer le site sur votre PC

1. Assurez-vous d'avoir lancé la commande (déjà fait par moi précédemment) :
   ```powershell
   cd web
   npm run build
   ```
2. Cela a créé un dossier `out` à l'intérieur du dossier `web`.
   - Chemin : `supfootball\web\out`

Ce dossier `out` contient TOUT votre site (HTML, CSS, JS, Images) prêt à l'emploi.

## Étape 2 : Envoyer sur cPanel

1. **Préparez l'archive** :
   - Allez dans le dossier `web`.
   - Entrez dans le dossier `out`.
   - Sélectionnez **tous** les fichiers et dossiers à l'intérieur.
   - Faites clic-droit -> Compresser vers fichier ZIP (ex: `website_static.zip`).

2. **Upload** :
   - Ouvrez le **Gestionnaire de fichiers** de cPanel.
   - Allez dans le dossier public de votre domaine (souvent `public_html`, ou un sous-dossier si c'est un sous-domaine).
   - **Videz** ce dossier s'il contient déjà des fichiers (attention de ne pas effacer d'autres sites si c'est partagé).
   - Cliquez sur **Charger** (Upload) et envoyez `website_static.zip`.

3. **Extraire** :
   - Faites un clic droit sur `website_static.zip` -> **Extract**.
   - Vous devriez voir plein de fichiers `.html` (`index.html`, `404.html`...) et un dossier `_next` directement à la racine de votre dossier web.

## Étape 3 : C'est fini !

Il n'y a **rien à configurer** ni à redémarrer.
- Pas de "Setup Node.js App".
- Pas de commande `npm start`.
- Pas de gestionnaire de processus.

Le serveur cPanel va simplement servir les fichiers HTML comme n'importe quelle page web classique. C'est la méthode la plus légère et la plus rapide.

---
**Attention** :
- Si votre site dépend d'une API backend, assurez-vous que les URLs d'API dans votre code frontend pointent bien vers votre serveur API backend (qui lui doit tourner sur un port spécifique ou une autre URL).
- Les liens d'images externes doivent fonctionner sans optimisation Next.js (c'est configuré).
