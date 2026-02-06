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
├── web/                    # Application Web (Next.js 15)
├── mobile/                 # Application Mobile (Capacitor/Android)
├── backend/                # API Backend (Express + MongoDB)
├── docs/                   # Documentation centralisée
│   ├── architecture/      # Architecture détaillée (anciennement 'back cc')
│   ├── guides/            # Guides d'utilisation et d'installation
│   └── api/                # Documentation des endpoints API
├── config/                 # Configurations centralisées (Docker, Nginx)
├── scripts/                # Scripts utilitaires
├── archive/                # Anciens designs et prototypes
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

### 2. Installation Mobile (Capacitor)

```bash
cd web
npm run build
npx cap sync android
npx cap open android
```

### 3. Installation Backend

```bash
cd backend
npm install

# Démarrer MongoDB
# Assurez-vous que MongoDB est lancé localement ou via Docker

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

[Voir `docs/architecture/backend/` pour la liste complète]

## 🎯 Fonctionnalités Principales

### ✅ Implémentées
- Dashboard avec scores live
- Navigation par onglets interactive
- Système de design "Premium" (Dark/Gold)
- Pages principales (News, Matchs, Billetterie)
- Architecture backend multiniveaux (Redis, BullMQ)
- Intégration Firebase pour Auth et Push
- Mode Mock/Demo pour tests hors-ligne

### 🔄 En Cours
- Finalisation de la synchronisation SportMonks
- Optimisation des performances PWA

### 🎯 À Venir
- Authentification complète
- Intégration API Football (RapidAPI)
- Système de paiement (Stripe/PayPal)
- Notifications push
- Mode hors-ligne (PWA)
- Déploiement production

## 📚 Documentation Complète

Toute la documentation détaillée se trouve dans le dossier `docs/` :

- **docs/architecture/overview.md** - Architecture globale
- **docs/architecture/backend/** - Guides backend complets
- **docs/guides/quick-start.md** - Démarrage rapide
- **docs/guides/implementation.md** - Guide d'implémentation
- **GUIDE_MODE_MOCK.md** - Guide du mode démonstration

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
