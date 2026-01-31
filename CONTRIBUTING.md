# 🤝 Guide de Contribution - FootballHub+

Merci de votre intérêt pour contribuer à FootballHub+ ! Ce guide vous aidera à comprendre notre processus de développement et nos standards.

---

## 📋 Table des Matières

1. [Code de Conduite](#code-de-conduite)
2. [Comment Contribuer](#comment-contribuer)
3. [Standards de Code](#standards-de-code)
4. [Structure du Projet](#structure-du-projet)
5. [Workflow Git](#workflow-git)
6. [Tests](#tests)
7. [Documentation](#documentation)

---

## 🤝 Code de Conduite

### Nos Engagements

- **Respect** : Traiter tous les contributeurs avec respect
- **Collaboration** : Travailler ensemble pour améliorer le projet
- **Qualité** : Maintenir des standards de code élevés
- **Transparence** : Communiquer ouvertement sur les décisions

---

## 🚀 Comment Contribuer

### 1. Trouver une Tâche

- Consultez les [Issues GitHub](https://github.com/beniich/supfoot/issues)
- Cherchez les labels `good first issue` ou `help wanted`
- Proposez de nouvelles fonctionnalités via une issue

### 2. Fork et Clone

```bash
# Fork le projet sur GitHub
# Puis clonez votre fork
git clone https://github.com/VOTRE-USERNAME/supfoot.git
cd supfootball

# Ajoutez le repo original comme remote
git remote add upstream https://github.com/beniich/supfoot.git
```

### 3. Créer une Branche

```bash
# Créez une branche descriptive
git checkout -b feature/nom-de-la-fonctionnalite
# ou
git checkout -b fix/nom-du-bug
```

### 4. Développer

- Suivez les [Standards de Code](#standards-de-code)
- Écrivez des tests pour votre code
- Documentez vos changements

### 5. Tester

```bash
# Frontend
cd web
npm run lint
npm run test
npm run build

# Backend
cd backend
npm run lint
npm run test
```

### 6. Commit

```bash
# Utilisez des messages de commit conventionnels
git commit -m "feat: ajoute système de notifications push"
git commit -m "fix: corrige bug de connexion WebSocket"
git commit -m "docs: met à jour guide d'installation"
```

**Format des commits** :
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage (pas de changement de code)
- `refactor:` Refactoring
- `test:` Ajout de tests
- `chore:` Tâches de maintenance

### 7. Push et Pull Request

```bash
# Push vers votre fork
git push origin feature/nom-de-la-fonctionnalite

# Créez une Pull Request sur GitHub
# Décrivez vos changements en détail
```

---

## 💻 Standards de Code

### Frontend (Next.js + TypeScript)

#### Conventions de Nommage

```typescript
// Composants : PascalCase
export default function MatchCard() { }

// Fonctions : camelCase
function calculateScore() { }

// Constantes : UPPER_SNAKE_CASE
const API_BASE_URL = "https://api.footballhub.com";

// Interfaces : PascalCase avec préfixe I (optionnel)
interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
}
```

#### Structure des Composants

```typescript
'use client';

import { useState, useEffect } from 'react';
import type { Match } from '@/types';

interface MatchCardProps {
  match: Match;
  onSelect?: (id: string) => void;
}

/**
 * Carte affichant les informations d'un match
 * @param match - Données du match
 * @param onSelect - Callback lors de la sélection
 */
export default function MatchCard({ match, onSelect }: MatchCardProps) {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Logic here
  }, []);

  return (
    <div className="match-card">
      {/* JSX */}
    </div>
  );
}
```

#### Règles ESLint

- ✅ Pas de `any` explicite (utiliser des types précis)
- ✅ Échapper les apostrophes (`&apos;` ou `&#39;`)
- ✅ Utiliser `next/image` au lieu de `<img>`
- ✅ Pas de variables inutilisées
- ✅ Imports organisés (React → Next → Libs → Local)

#### Tailwind CSS

```typescript
// ✅ Bon : Classes utilitaires
<div className="flex items-center gap-4 p-4 bg-surface-dark rounded-lg">

// ❌ Mauvais : Styles inline
<div style={{ display: 'flex', padding: '16px' }}>

// ✅ Bon : Utiliser les variables CSS custom
<div className="bg-primary text-background-dark">

// ✅ Bon : Classes conditionnelles
<div className={`card ${isActive ? 'active' : ''}`}>
```

### Backend (Express + MongoDB)

#### Structure des Routes

```javascript
// routes/matches.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const Match = require('../models/Match');

/**
 * GET /api/matches
 * Récupère la liste des matchs
 * @query {string} league - Filtrer par ligue
 * @query {string} date - Filtrer par date
 */
router.get('/', async (req, res) => {
  try {
    const { league, date } = req.query;
    const filter = {};
    
    if (league) filter.league = league;
    if (date) filter.date = new Date(date);
    
    const matches = await Match.find(filter).sort({ date: -1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/matches
 * Crée un nouveau match (admin uniquement)
 * @body {object} match - Données du match
 */
router.post('/', authenticate, async (req, res) => {
  // Implementation
});

module.exports = router;
```

#### Modèles Mongoose

```javascript
// models/Match.js
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  homeTeam: {
    type: String,
    required: [true, 'L\'équipe domicile est requise'],
    trim: true
  },
  awayTeam: {
    type: String,
    required: [true, 'L\'équipe extérieure est requise'],
    trim: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'live', 'finished', 'cancelled'],
    default: 'scheduled'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Indexes
matchSchema.index({ date: -1, status: 1 });

// Méthodes
matchSchema.methods.isLive = function() {
  return this.status === 'live';
};

module.exports = mongoose.model('Match', matchSchema);
```

---

## 📁 Structure du Projet

### Organisation des Fichiers

```
web/src/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Route principale
│   └── matches/           # Route /matches
│       └── page.tsx
│
├── components/            # Composants réutilisables
│   ├── ui/               # Composants UI de base
│   ├── features/         # Composants métier
│   └── layout/           # Composants de mise en page
│
├── hooks/                # Hooks personnalisés
│   ├── useAuth.ts
│   └── useMatches.ts
│
├── services/             # Services API
│   ├── api.ts
│   └── auth.ts
│
├── utils/                # Utilitaires
│   ├── format.ts
│   └── validation.ts
│
├── types/                # Types TypeScript
│   └── index.ts
│
└── config/               # Configuration
    └── constants.ts
```

### Où Placer Votre Code ?

| Type de Code | Emplacement | Exemple |
|--------------|-------------|---------|
| Nouvelle page | `app/nom-page/page.tsx` | `app/shop/page.tsx` |
| Composant UI | `components/ui/` | `components/ui/Button.tsx` |
| Composant métier | `components/features/` | `components/features/matches/MatchCard.tsx` |
| Hook personnalisé | `hooks/` | `hooks/useMatches.ts` |
| Service API | `services/` | `services/matches.ts` |
| Utilitaire | `utils/` | `utils/formatDate.ts` |
| Type TypeScript | `types/` | `types/match.ts` |
| Route backend | `backend/src/routes/` | `backend/src/routes/matches.js` |
| Modèle backend | `backend/src/models/` | `backend/src/models/Match.js` |

---

## 🌳 Workflow Git

### Branches

```
main                    # Production (protégée)
├── develop            # Développement (protégée)
│   ├── feature/auth   # Nouvelle fonctionnalité
│   ├── fix/login-bug  # Correction de bug
│   └── refactor/api   # Refactoring
```

### Règles

1. **Jamais de commit direct sur `main` ou `develop`**
2. **Toujours créer une branche** pour vos changements
3. **Pull Request obligatoire** pour merger
4. **Review de code** par au moins 1 personne
5. **Tests passants** avant merge

### Synchronisation

```bash
# Récupérer les derniers changements
git fetch upstream
git checkout develop
git merge upstream/develop

# Rebaser votre branche
git checkout feature/ma-fonctionnalite
git rebase develop
```

---

## 🧪 Tests

### Frontend (Jest + React Testing Library)

```typescript
// __tests__/components/MatchCard.test.tsx
import { render, screen } from '@testing-library/react';
import MatchCard from '@/components/features/matches/MatchCard';

describe('MatchCard', () => {
  const mockMatch = {
    id: '1',
    homeTeam: 'Raja CA',
    awayTeam: 'Wydad AC',
    date: new Date('2026-02-01'),
    status: 'scheduled'
  };

  it('affiche les noms des équipes', () => {
    render(<MatchCard match={mockMatch} />);
    expect(screen.getByText('Raja CA')).toBeInTheDocument();
    expect(screen.getByText('Wydad AC')).toBeInTheDocument();
  });

  it('affiche le statut du match', () => {
    render(<MatchCard match={mockMatch} />);
    expect(screen.getByText('À venir')).toBeInTheDocument();
  });
});
```

### Backend (Jest + Supertest)

```javascript
// __tests__/routes/matches.test.js
const request = require('supertest');
const app = require('../../src/index');
const Match = require('../../src/models/Match');

describe('GET /api/matches', () => {
  beforeEach(async () => {
    await Match.deleteMany({});
  });

  it('retourne une liste vide si aucun match', async () => {
    const res = await request(app).get('/api/matches');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('retourne les matchs triés par date', async () => {
    await Match.create([
      { homeTeam: 'A', awayTeam: 'B', date: new Date('2026-02-01') },
      { homeTeam: 'C', awayTeam: 'D', date: new Date('2026-01-01') }
    ]);

    const res = await request(app).get('/api/matches');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].homeTeam).toBe('A'); // Plus récent en premier
  });
});
```

### Lancer les Tests

```bash
# Frontend
cd web
npm run test              # Tests unitaires
npm run test:watch        # Mode watch
npm run test:coverage     # Couverture

# Backend
cd backend
npm run test
npm run test:watch
npm run test:coverage

# E2E (Playwright)
cd web
npm run test:e2e
```

---

## 📚 Documentation

### JSDoc pour JavaScript/TypeScript

```typescript
/**
 * Calcule le score total d'un match
 * @param homeScore - Score de l'équipe domicile
 * @param awayScore - Score de l'équipe extérieure
 * @returns Score total
 * @example
 * calculateTotalScore(2, 1) // Returns 3
 */
function calculateTotalScore(homeScore: number, awayScore: number): number {
  return homeScore + awayScore;
}
```

### README pour Nouveaux Modules

Chaque nouveau module/service doit avoir un README :

```markdown
# Service de Notifications

## Description
Gère l'envoi de notifications push aux utilisateurs.

## Utilisation

\`\`\`typescript
import { sendNotification } from '@/services/notifications';

await sendNotification({
  userId: '123',
  title: 'Match en direct',
  body: 'Raja CA vs Wydad AC a commencé !'
});
\`\`\`

## API

### `sendNotification(options)`
Envoie une notification à un utilisateur.

**Paramètres:**
- `userId` (string) - ID de l'utilisateur
- `title` (string) - Titre de la notification
- `body` (string) - Corps de la notification

**Retourne:** Promise<void>
```

---

## ❓ Questions ?

- **Issues GitHub** : [github.com/beniich/supfoot/issues](https://github.com/beniich/supfoot/issues)
- **Discussions** : [github.com/beniich/supfoot/discussions](https://github.com/beniich/supfoot/discussions)
- **Email** : support@footballhub.com

---

## 📜 Licence

En contribuant à FootballHub+, vous acceptez que vos contributions soient sous la même licence que le projet.

---

**Merci de contribuer à FootballHub+ ! ⚽❤️**
