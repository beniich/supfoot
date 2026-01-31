# 📱 FootballHub+ - Architecture & Structure

## 🏗️ **Architecture Globale**

```
supfootball/
├── 📁 backend/              # API NestJS + Node.js
├── 📁 web/                  # Frontend Next.js 15
├── 📁 community_hub/        # HTML/CSS statique (prototype)
└── 📁 .agent/              # Configuration workspace
```

---

## 🎯 **Frontend Structure (Next.js 15 - App Router)**

### **Pages & Routes**

```
web/src/app/
├── 🏠 page.tsx                    # Dashboard principal (live matches, quick actions)
├── 🎨 globals.css                 # Styles globaux (Tailwind + customs)
├── ⚙️ layout.tsx                  # Root layout (fonts, metadata)
│
├── 📂 onboarding/
│   ├── success/                   # ✅ Écran de succès post-inscription
│   └── [autres étapes]/
│
├── 📂 membership/
│   ├── activation/                # 🎟️ Activation carte de membre
│   └── comparison/                # 📊 Comparaison des plans (Standard/Pro/Elite)
│
├── 📂 profile/
│   ├── page.tsx                   # Profil utilisateur
│   ├── membership/
│   │   ├── page.tsx              # Gestion abonnement
│   │   └── perks/                # 🎁 Avantages partenaires (Adidas, Uber, etc.)
│   ├── billing/
│   ├── orders/
│   └── payments/
│
├── 📂 shop/                       # 🛒 E-commerce
│   ├── page.tsx                   # Vue principale boutique
│   ├── product/                   # Détail produit
│   ├── results/                   # 🔍 Recherche & filtres
│   └── confirmation/              # Confirmation commande
│
├── 📂 tickets/
│   ├── my-ticket/                 # 🎫 Billet digital avec QR code
│   └── scan/                      # Scanner de billets
│
├── 📂 scanner/                    # 📷 Interface staff pour validation
│
├── 📂 matches/                    # ⚽ Calendrier des matchs
├── 📂 live/                       # 📺 Match Center en direct
├── 📂 match-center/               # Détails match avancés
│
├── 📂 news/                       # 📰 Articles & vidéos
│   ├── video/
│   └── article/
│
├── 📂 fantasy/                    # 🏆 Fantasy League
│   └── manage/                    # Gestion équipe
│
├── 📂 ai-hub/                     # 🤖 Prédictions IA
│
├── 📂 referees/                   # 👨‍⚖️ Analytics arbitres
│   └── [id]/                      # Profil arbitre détaillé
│
├── 📂 community/                  # 💬 Forum & threads
│   └── thread/
│
├── 📂 clubs/                      # 🛡️ Profils clubs
│   ├── raja/
│   └── wydad/
│
├── 📂 loyalty/                    # 🎖️ Programme de fidélité
├── 📂 referral/                   # 👥 Parrainage
├── 📂 help/                       # ❓ Centre d'aide
├── 📂 support/                    # 🆘 Support client
├── 📂 notifications/              # 🔔 Centre de notifications
├── 📂 settings/                   # ⚙️ Paramètres
├── 📂 search/                     # 🔎 Recherche globale
├── 📂 analytics/                  # 📈 Statistiques utilisateur
├── 📂 widgets/                    # 🧩 Widget dashboard
├── 📂 brand/                      # 🏷️ Branding
├── 📂 about/                      # ℹ️ À propos
├── 📂 partners/                   # 🤝 Partenaires
│
├── 📂 splash/                     # 🌟 Écran de démarrage
├── 📂 login/                      # 🔐 Connexion
├── 📂 register/                   # ✍️ Inscription
└── 📂 checkout/                   # 💳 Paiement

```

---

## 🧩 **Composants Réutilisables**

```
web/src/components/
└── BottomNav.tsx                  # Navigation inférieure (Home, Matches, Media, Shop, Profile)
```

---

## 🎨 **Design System**

### **Couleurs Principales**
```css
--primary: #f2b90d (Gold)          # Couleur signature
--background-dark: #181611          # Fond sombre principal
--surface-dark: #242320             # Surface cartes
--text-primary: #ffffff             # Texte blanc
--text-secondary: #bab29c           # Texte gris/beige
```

### **Typographie**
- **Google Fonts**: `Work Sans` (sans-serif premium)
- **Icons**: Material Symbols Outlined

### **Animations**
- Glassmorphism (backdrop-blur)
- Glow effects (`shadow-glow`)
- Hover transitions
- Confetti overlays

---

## 🔧 **Backend Structure (NestJS)**

```
backend/src/
├── index.js                       # Entry point
├── 📂 models/                     # Mongoose schemas
│   ├── User.js
│   ├── Match.js
│   ├── Team.js
│   ├── Ticket.js
│   ├── Product.js
│   └── Order.js
│
├── 📂 routes/                     # API endpoints
│   ├── auth.js                    # Login/Register
│   ├── matches.js                 # Matchs
│   ├── leagues.js                 # Ligues
│   ├── products.js                # E-commerce
│   └── orders.js                  # Commandes
│
├── 📂 services/                   # Business logic
│   ├── footballApi.js             # API-Football integration
│   ├── predictionService.js       # IA predictions
│   ├── notificationService.js     # Push notifications
│   ├── syncService.js             # Data sync
│   ├── uefaScraper.js             # UEFA scraping
│   └── websocketService.js        # Real-time updates
│
└── 📂 middleware/                 # Auth, validation, etc.
```

---

## 📊 **Fonctionnalités Principales**

### ✅ **Implémentées**
1. **Onboarding** - Success screen avec confetti
2. **Membership** - Carte digitale, activation, comparaison plans, perks partenaires
3. **Digital Tickets** - Billet QR code, wallet Apple, plan stade
4. **Scanner** - Interface staff pour validation entrée
5. **Shop** - Catalogue, détail produit, recherche/filtres, confirmation
6. **Matches** - Calendrier, live center, détails avancés
7. **Fantasy League** - Gestion équipe, prédictions IA
8. **Referees Hub** - Analytics arbitres, profils détaillés
9. **Community** - Forum, threads
10. **News** - Articles, vidéos highlights
11. **Loyalty** - Points, récompenses, gamification
12. **Referral** - Programme parrainage

### 🚧 **Backend Intégration**
- API Football (live data)
- MongoDB (base de données)
- WebSockets (real-time)
- Notifications push

---

## ⚠️ **Erreurs ESLint Identifiées**

### **Critiques (à corriger)**
1. **Apostrophes non échappées** (`'` → `&apos;` ou `&#39;`)
   - `/clubs/raja/page.tsx`
   - `/market/page.tsx`
   - `/match-center/page.tsx`
   - `/page.tsx` (dashboard)
   - `/shop/confirmation/page.tsx`

2. **Types `any` explicites** (TypeScript strict)
   - `/live/page.tsx`
   - `/login/page.tsx`
   - `/referees/[id]/page.tsx`
   - `/referees/page.tsx`
   - `/register/page.tsx`
   - `/tickets/my-ticket/page.tsx`

### **Warnings (non-bloquantes)**
1. **Images non optimisées** (`<img>` → `<Image>` Next.js)
   - Dashboard, shop, checkout, AI Hub, news
2. **Variables non utilisées** (`Link`, `useParams`)
   - loyalty, market, notifications, referees
3. **Custom fonts** (avertissement Next.js)
   - `/layout.tsx` (fonts Google)

---

## 🚀 **Prochaines Étapes Recommandées**

1. **Corriger ESLint errors** (apostrophes + types any)
2. **Optimiser images** (migration vers `next/image`)
3. **Mobile setup** (Capacitor pour iOS/Android)
4. **Backend sync** (connexion API-Football réelle)
5. **Tests E2E** (Playwright/Cypress)
6. **Déploiement** (Vercel + MongoDB Atlas)

---

## 📦 **Configuration Actuelle**

- **Next.js**: 15.5.11
- **React**: 19
- **Tailwind CSS**: 3.x
- **TypeScript**: 5.x
- **ESLint**: Strict mode
- **Node.js**: v20+ (backend)
- **MongoDB**: Mongoose ODM

---

**Status**: ✅ MVP Fonctionnel | 🚧 Optimisations en cours
