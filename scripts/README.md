# 🔧 Scripts Utilitaires - FootballHub+

Ce dossier contient les scripts utilitaires pour automatiser les tâches courantes du projet.

---

## 📋 Scripts Disponibles

### 🏗️ `harmonize-structure.ps1`

**Description**: Automatise l'harmonisation de la structure du projet (Phase 1).

**Fonctionnalités**:
- Archive ou supprime les 58 dossiers HTML prototypes
- Renomme `back cc/` en `docs/architecture/`
- Crée la structure de documentation
- Déplace les fichiers de configuration
- Crée les dossiers utilitaires

**Usage**:

```powershell
# Mode simulation (aucune modification)
.\scripts\harmonize-structure.ps1 -DryRun

# Archivage des prototypes (recommandé)
.\scripts\harmonize-structure.ps1 -Archive

# Suppression des prototypes (si déjà intégrés)
.\scripts\harmonize-structure.ps1 -Delete

# Combinaisons
.\scripts\harmonize-structure.ps1 -DryRun -Archive  # Simulation archivage
.\scripts\harmonize-structure.ps1 -DryRun -Delete   # Simulation suppression
```

**Paramètres**:
- `-DryRun` : Mode simulation (aucune modification)
- `-Archive` : Archive les prototypes dans `archive/prototypes/`
- `-Delete` : Supprime les prototypes (irréversible)

**Sortie**:
```
🔧 FootballHub+ - Harmonisation de la Structure
=================================================

📦 Étape 1: Traitement des prototypes HTML
📦 Archivé: about_footballhub+ → archive/prototypes/
📦 Archivé: community_hub → archive/prototypes/
...

📚 Étape 2: Restructuration de la documentation
✅ Renommé: 'back cc' → 'docs/architecture'

📁 Étape 3: Création de la structure docs/
✅ Créé: docs/guides
✅ Créé: docs/api
...

=================================================
✅ Harmonisation Terminée!
=================================================
```

---

## 🚀 Scripts à Créer (Roadmap)

### `setup.sh` / `setup.ps1`
**Description**: Installation complète du projet

**Fonctionnalités prévues**:
```bash
# Installation de toutes les dépendances
- Vérifier Node.js, npm, MongoDB
- Installer dépendances web (npm install)
- Installer dépendances backend (npm install)
- Installer dépendances mobile (npm install)
- Copier .env.example → .env
- Créer base de données MongoDB
- Seed données de test
```

**Usage prévu**:
```bash
./scripts/setup.sh
# ou
.\scripts\setup.ps1
```

---

### `dev.sh` / `dev.ps1`
**Description**: Lancement de l'environnement de développement

**Fonctionnalités prévues**:
```bash
# Démarrer tous les services en parallèle
- MongoDB (Docker)
- Backend API (port 5000)
- Frontend Web (port 3000)
- Mobile Expo (optionnel)
```

**Usage prévu**:
```bash
./scripts/dev.sh
# ou
.\scripts\dev.ps1

# Options
./scripts/dev.sh --web-only      # Seulement frontend
./scripts/dev.sh --backend-only  # Seulement backend
./scripts/dev.sh --mobile        # Inclure mobile
```

---

### `build.sh` / `build.ps1`
**Description**: Build de production

**Fonctionnalités prévues**:
```bash
# Build tous les projets
- Build frontend web (Next.js)
- Build backend (si nécessaire)
- Build mobile (Expo)
- Vérification des builds
- Rapport de taille des bundles
```

**Usage prévu**:
```bash
./scripts/build.sh
# ou
.\scripts\build.ps1

# Options
./scripts/build.sh --analyze  # Analyse des bundles
```

---

### `deploy.sh` / `deploy.ps1`
**Description**: Déploiement en production

**Fonctionnalités prévues**:
```bash
# Déploiement automatisé
- Build production
- Tests pré-déploiement
- Déploiement frontend (Vercel)
- Déploiement backend (VPS/Cloud)
- Vérification santé des services
- Rollback si échec
```

**Usage prévu**:
```bash
./scripts/deploy.sh --env production
# ou
.\scripts\deploy.ps1 -Env production

# Options
./scripts/deploy.sh --env staging   # Déploiement staging
./scripts/deploy.sh --dry-run       # Simulation
./scripts/deploy.sh --rollback      # Rollback version précédente
```

---

### `seed-db.sh` / `seed-db.ps1`
**Description**: Seed de la base de données

**Fonctionnalités prévues**:
```bash
# Insertion de données de test
- Vérifier connexion MongoDB
- Nettoyer base de données (optionnel)
- Insérer utilisateurs de test
- Insérer matchs de test
- Insérer produits de test
- Rapport d'insertion
```

**Usage prévu**:
```bash
./scripts/seed-db.sh
# ou
.\scripts\seed-db.ps1

# Options
./scripts/seed-db.sh --clean    # Nettoyer avant seed
./scripts/seed-db.sh --minimal  # Données minimales
./scripts/seed-db.sh --full     # Données complètes
```

---

### `clean.sh` / `clean.ps1`
**Description**: Nettoyage du projet

**Fonctionnalités prévues**:
```bash
# Nettoyage des fichiers temporaires
- Supprimer node_modules (web, backend, mobile)
- Supprimer .next (Next.js cache)
- Supprimer dist/build
- Supprimer logs
- Supprimer fichiers temporaires
```

**Usage prévu**:
```bash
./scripts/clean.sh
# ou
.\scripts\clean.ps1

# Options
./scripts/clean.sh --deep       # Nettoyage profond
./scripts/clean.sh --cache-only # Seulement caches
```

---

### `test.sh` / `test.ps1`
**Description**: Exécution de tous les tests

**Fonctionnalités prévues**:
```bash
# Tests complets
- Tests unitaires frontend
- Tests unitaires backend
- Tests d'intégration
- Tests E2E
- Rapport de couverture
```

**Usage prévu**:
```bash
./scripts/test.sh
# ou
.\scripts\test.ps1

# Options
./scripts/test.sh --unit        # Seulement tests unitaires
./scripts/test.sh --e2e         # Seulement tests E2E
./scripts/test.sh --coverage    # Avec couverture
./scripts/test.sh --watch       # Mode watch
```

---

### `lint.sh` / `lint.ps1`
**Description**: Linting et formatage du code

**Fonctionnalités prévues**:
```bash
# Linting et formatage
- ESLint (web + backend)
- Prettier (formatage)
- TypeScript check
- Rapport d'erreurs
```

**Usage prévu**:
```bash
./scripts/lint.sh
# ou
.\scripts\lint.ps1

# Options
./scripts/lint.sh --fix         # Auto-fix
./scripts/lint.sh --format      # Formatage Prettier
```

---

## 📝 Conventions

### Nommage
- Scripts Bash: `nom-script.sh` (kebab-case)
- Scripts PowerShell: `nom-script.ps1` (kebab-case)
- Fonctions: `camelCase` ou `PascalCase`

### Structure
```bash
#!/bin/bash
# Description du script
# Usage: ./script.sh [options]

set -e  # Exit on error

# Variables
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Fonctions
function main() {
  # Logic here
}

# Exécution
main "$@"
```

### Documentation
Chaque script doit inclure:
- Description claire
- Usage avec exemples
- Paramètres/options
- Codes de sortie

---

## 🤝 Contribution

Pour ajouter un nouveau script:

1. Créer le script dans `scripts/`
2. Ajouter la documentation dans ce README
3. Tester le script
4. Commit avec message descriptif

Voir `CONTRIBUTING.md` pour plus de détails.

---

## 📚 Ressources

- [Bash Scripting Guide](https://www.gnu.org/software/bash/manual/)
- [PowerShell Documentation](https://docs.microsoft.com/powershell/)
- [Shell Style Guide](https://google.github.io/styleguide/shellguide.html)

---

**Dernière mise à jour**: 31 janvier 2026
