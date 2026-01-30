# 🏗️ FootballHub+ - Architecture Complète

## 📋 Vue d'Ensemble du Projet

FootballHub+ est une plateforme SaaS complète pour le football qui combine :
- **Application Web** (Next.js + Tailwind CSS)
- **Application Mobile** (Expo + React Native + NativeWind)
- **Backend API** (Express + MongoDB)
- **Designs Exportés** (58+ écrans HTML/Tailwind)

## 🗂️ Structure du Projet

```
supfootball/
├── web/                    # Application Web (Next.js)
│   ├── src/
│   │   ├── app/           # Pages Next.js App Router
│   │   │   ├── page.tsx           # Dashboard
│   │   │   ├── ai-hub/            # Hub IA Prédictions
│   │   │   ├── community/         # Hub Communautaire
│   │   │   ├── matches/           # Liste des matchs
│   │   │   ├── shop/              # Boutique e-commerce
│   │   │   ├── tickets/           # Billetterie digitale
│   │   │   └── profile/           # Profil utilisateur
│   │   ├── components/    # Composants réutilisables
│   │   │   ├── MatchCard.tsx
│   │   │   ├── QuickAction.tsx
│   │   │   ├── NewsCard.tsx
│   │   │   └── BottomNav.tsx
│   │   └── app/
│   │       ├── globals.css
│   │       └── layout.tsx
│   ├── tailwind.config.js
│   ├── next.config.ts
│   └── package.json
│
├── mobile/                 # Application Mobile (Expo)
│   ├── App.tsx            # Point d'entrée
│   ├── app.json           # Config Expo
│   ├── tailwind.config.js # NativeWind config
│   ├── babel.config.js
│   ├── metro.config.js
│   └── package.json
│
├── backend/                # API Backend (Express + MongoDB)
│   ├── src/
│   │   ├── models/        # Modèles Mongoose (18 modèles)
│   │   ├── routes/        # Routes API (11 routes)
│   │   ├── services/      # Services métier (7 services)
│   │   ├── middleware/    # Auth, validation, errors
│   │   ├── jobs/          # CRON jobs
│   │   ├── seeds/         # Données de test
│   │   └── index.js       # Serveur principal
│   ├── .env
│   └── package.json
│
├── shared/                 # Code partagé (types, utils)
│
├── docs/                   # Documentation
│
├── back cc/                # Architecture détaillée (référence)
│   ├── ARCHITECTURE_FOOTBALLHUB.md
│   ├── BACKEND_COMPLETE_GUIDE.md
│   ├── ALL_MODELS_PART1.md
│   ├── ALL_MODELS_PART2_FINAL.md
│   ├── ALL_ROUTES_PART1.md
│   ├── ALL_ROUTES_PART2.md
│   ├── ALL_ROUTES_PART3_FINAL.md
│   └── ... (40+ fichiers de documentation)
│
├── [58 dossiers de designs HTML]
│   ├── footballhub+_dashboard/
│   ├── community_hub/
│   ├── ai_predictions_hub/
│   └── ... (designs exportés)
│
└── README.md
```

## 🎨 Design System

### Couleurs
```css
--primary: #f2cc0d          /* Jaune/Or FootballHub+ */
--background-dark: #221f10   /* Charcoal profond */
--surface-dark: #2d2a1d      /* Cartes/Surfaces */
--background-light: #f8f8f5  /* Mode clair */
```

### Typographie
- **Display**: Space Grotesk (Dashboard, AI Hub)
- **Body**: Lexend (Community Hub)
- **Icons**: Material Symbols Outlined

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+
- MongoDB 7+
- npm ou yarn

### 1. Installation Web

```bash
cd web
npm install
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

### 2. Installation Mobile

```bash
cd mobile
npm install
npx expo start
```

Scannez le QR code avec Expo Go (iOS/Android)

### 3. Installation Backend

```bash
cd backend
npm install

# Démarrer MongoDB (Docker)
docker run -d --name footballhub-mongodb -p 27017:27017 mongo:7

# Insérer les données de test
npm run seed

# Démarrer le serveur
npm run dev
```

L'API sera disponible sur `http://localhost:5000`

## 📱 Pages Disponibles (Web)

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/` | Scores live, actions rapides, news |
| Matches | `/matches` | Liste des matchs live et à venir |
| Community Hub | `/community` | Forums, groupes de fans, posts |
| AI Hub | `/ai-hub` | Prédictions IA, analyses de matchs |
| Shop | `/shop` | Boutique e-commerce |
| Tickets | `/tickets` | Billetterie digitale avec QR |
| Profile | `/profile` | Profil utilisateur et paramètres |

## 🔌 API Endpoints (Backend)

### Auth
- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter
- `GET /api/auth/me` - Profil utilisateur

### Matches
- `GET /api/matches` - Liste des matchs
- `GET /api/matches/live` - Matchs en direct
- `GET /api/matches/:id` - Détail d'un match

### Tickets
- `GET /api/tickets` - Liste des tickets
- `POST /api/tickets` - Créer un ticket
- `POST /api/tickets/:id/validate` - Valider un ticket

### Shop
- `GET /api/products` - Liste des produits
- `POST /api/orders` - Créer une commande

[Voir `back cc/BACKEND_COMPLETE_GUIDE.md` pour la liste complète]

## 🎯 Fonctionnalités Principales

### ✅ Implémentées
- Dashboard avec scores live
- Navigation bottom bar
- Système de design cohérent
- Pages principales (7 pages)
- Composants réutilisables
- Architecture backend complète
- Modèles de données (18 modèles)
- Routes API (11 routes)

### 🔄 En Cours
- Installation des dépendances Web/Mobile
- Intégration backend avec frontend
- Tests des endpoints API

### 🎯 À Venir
- Authentification complète
- Intégration API Football (RapidAPI)
- Système de paiement (Stripe/PayPal)
- Notifications push
- Mode hors-ligne (PWA)
- Déploiement production

## 📚 Documentation Complète

Toute la documentation détaillée se trouve dans le dossier `back cc/` :

- **ARCHITECTURE_FOOTBALLHUB.md** - Architecture globale
- **BACKEND_COMPLETE_GUIDE.md** - Guide backend complet
- **IMPLEMENTATION_GUIDE.md** - Guide d'implémentation
- **QUICK_START_GUIDE.md** - Démarrage rapide
- **DEPLOYMENT_WEBSOCKET_CONFIG.md** - Configuration déploiement
- **DOCKER_KUBERNETES_CONFIG.md** - Containerisation

## 🛠️ Technologies Utilisées

### Frontend Web
- Next.js 15
- React 19
- Tailwind CSS
- TypeScript

### Mobile
- Expo
- React Native
- NativeWind (Tailwind pour mobile)

### Backend
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- WebSocket (temps réel)
- CRON jobs

## 🤝 Contribution

Ce projet est en développement actif. Pour contribuer :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Propriétaire - FootballHub+ 2026

---

**Développé avec ❤️ pour les passionnés de football**
