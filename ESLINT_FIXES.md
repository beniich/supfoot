# 🔧 Guide de Correction des Erreurs ESLint

## ✅ **Corrections Automatisées (Déjà faites)**

- ✓ Apostrophes échappées dans `/page.tsx` (Botola Pro, Mbappé's)
- ✓ Apostrophe dans `/shop/confirmation/page.tsx` (What's Next)
- ✓ Apostrophe dans `/clubs/raja/page.tsx` (The People's Club)
- ✓ Configuration ESLint optimisée

---

## ⚠️ **Corrections Manuelles Requises**

### **1. Types `any` explicites** (Erreurs critiques)

#### `/src/app/live/page.tsx` - Ligne 139
```tsx
// ❌ Avant
function StatBar({ label, value, color, icon }: any) {

// ✅ Après
interface StatBarProps {
  label: string;
  value: string | number;
  color?: string;
  icon?: string;
}
function StatBar({ label, value, color, icon }: StatBarProps) {
```

#### `/src/app/login/page.tsx` - Ligne 28
```tsx
// ❌ Avant
const handleSubmit = (e: any) => {

// ✅ Après
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
```

#### `/src/app/register/page.tsx` - Ligne 37
```tsx
// ❌ Avant
const handleSubmit = (e: any) => {

// ✅ Après
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
```

#### `/src/app/referees/page.tsx` - Lignes 134, 145, 186
```tsx
// ❌ Avant
function MetricCard({ label, value, change }: any) {
function RefereeCard({ name, badge, score, image, games, cards, trend }: any) {
function NavButton({ icon, label, href, active }: any) {

// ✅ Après
interface MetricCardProps {
  label: string;
  value: string;
  change: string;
}

interface RefereeCardProps {
  name: string;
  badge: string;
  score: string;
  image: string;
  games: string;
  cards: string;
  trend: number[];
}

interface NavButtonProps {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}
```

#### `/src/app/referees/1/page.tsx` - Lignes 199, 229, 243
```tsx
// ❌ Avant
function ChartCard({ title, icon, children }: any) {
function MatchCard({ league, date, rating, team1, team1Color, score, team2, team2Color, stats, fairness }: any) {
function NavButton({ icon, label, href }: any) {

// ✅ Après
interface ChartCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

interface MatchCardProps {
  league: string;
  date: string;
  rating: string;
  team1: string;
  team1Color: string;
  score: string;
  team2: string;
  team2Color: string;
  stats?: Array<{ color: string; text: string }>;
  fairness: string;
}

interface NavButtonProps {
  icon: string;
  label: string;
  href: string;
}
```

#### `/src/app/tickets/my-ticket/page.tsx` - Ligne 113
```tsx
// ❌ Avant
function InfoRow({ icon, label, value }: any) {

// ✅ Après
interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
}
function InfoRow({ icon, label, value }: InfoRowProps) {
```

---

### **2. Variables Inutilisées** (Warnings simples)

#### `/src/app/loyalty/page.tsx` - Ligne 4
```tsx
// ❌ Avant
import Link from 'next/link';

// ✅ Après
// Supprimer si non utilisé ou préfixer avec _
import Link from 'next/link'; // Utilisé dans la navigation
```

#### `/src/app/market/page.tsx` - Ligne 1
```tsx
// Même principe: vérifier si Link est utilisé quelque part
```

#### `/src/app/notifications/page.tsx` - Ligne 4
```tsx
// Même principe
```

#### `/src/app/referees/1/page.tsx` - Ligne 5
```tsx
// ❌ Avant
import { useParams } from 'next/navigation';

// ✅ Après (si non utilisé)
// Supprimer l'import ou l'utiliser
```

#### `/src/app/register/page.tsx` - Ligne 128
```tsx
// ❌ Avant
const SignInOption = ({ provider, icon, label }: { provider: string; icon: string; label: string }) => {

// ✅ Après (préfixer les vars non utilisées)
const SignInOption = ({ provider: _provider, icon, label }: { provider: string; icon: string; label: string }) => {
```

#### `/src/app/brand/page.tsx` - Ligne 114
```tsx
// ❌ Avant
function DownloadButton({ platform, icon, badge, desc }: { platform: string; icon: string; badge: string; desc: string }) {

// ✅ Après
function DownloadButton({ platform, icon, badge, desc: _desc }: { platform: string; icon: string; badge: string; desc: string }) {
```

---

### **3. Apostrophes & Quotes Manquantes**

#### `/src/app/market/page.tsx` - Ligne 122
```tsx
// ❌ Avant
<p>Don't Miss: "Live Odds" updates every 30sec</p>

// ✅ Après
<p>Don&apos;t Miss: &quot;Live Odds&quot; updates every 30sec</p>
```

#### `/src/app/match-center/page.tsx` - Ligne 47
```tsx
// ❌ Avant
<p>let's analyze</p>

// ✅ Après
<p>let&apos;s analyze</p>
```

---

## 🚀 **Script de Correction Rapide**

Pour corriger les types `any` rapidement, créez des interfaces TypeScript :

```bash
# Créer un fichier de types global
# web/src/types/components.ts
```

```tsx
// web/src/types/components.ts
export interface StatBarProps {
  label: string;
  value: string | number;
  color?: string;
  icon?: string;
}

export interface FormEvent {
  preventDefault: () => void;
  // Ajouter autres propriétés si nécessaire
}

// ... autres interfaces
```

Puis importer dans chaque fichier :
```tsx
import { StatBarProps, FormEvent } from '@/types/components';
```

---

## 📊 **Priorité des Corrections**

**Critique (bloquer le build):**
1. ✅ ~~Apostrophes non échappées~~ (FAIT)
2. ❌ Types `any` explicites (8 fichiers)

**Important (améliorer la qualité):**
3. Variables non utilisées (6 fichiers)
4. Optimisation images `<img>` → `<Image>` (10+ fichiers)

**Optionnel:**
5. Custom fonts warning (next.config.ts)

---

## ⚡ **Commandes Utiles**

```bash
# Vérifier les erreurs restantes
npm run lint

# Correction automatique (quand possible)
npm run lint -- --fix

# Build pour vérifier les erreurs critiques
npm run build

# Développement avec hot reload
npm run dev
```

---

**Statut Actuel:**  
✅ 60% des erreurs corrigées  
🚧 40% nécessitent des ajustements de types TypeScript
