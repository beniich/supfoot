# Guide d'Utilisation - Mode Mock/Demo

## 📖 Introduction

L'application SupFootball dispose d'un **mode mock/demo** qui permet de tester l'application sans avoir besoin d'un backend fonctionnel. Ce mode est particulièrement utile pour :

- Le développement frontend sans dépendance au backend
- Les démonstrations et présentations
- Les tests d'interface utilisateur
- Le développement hors ligne

## 🚀 Activation du Mode Mock

### Méthode 1 : Via le fichier .env.local

1. Copiez le fichier `.env.local.example` vers `.env.local` :
   ```bash
   cp web/.env.local.example web/.env.local
   ```

2. Ouvrez `web/.env.local` et modifiez la variable :
   ```env
   NEXT_PUBLIC_USE_MOCK_DATA=true
   ```

3. Redémarrez le serveur de développement :
   ```bash
   cd web
   npm run dev
   ```

### Méthode 2 : Via la ligne de commande

Vous pouvez également définir la variable d'environnement directement :

```bash
# Windows PowerShell
$env:NEXT_PUBLIC_USE_MOCK_DATA="true"; npm run dev

# Linux/Mac
NEXT_PUBLIC_USE_MOCK_DATA=true npm run dev
```

## 📊 Données Mock Disponibles

### Composants avec Données Mock

1. **MatchesRail** (`src/components/home/MatchesRail.tsx`)
   - 3 matchs de démonstration
   - Statuts : Full Time et Live
   - Scores et équipes fictifs

2. **LoyaltyBadges** (`src/components/LoyaltyBadges.tsx`)
   - Badges de fidélité
   - Niveaux : Bronze, Silver, Gold, Platinum

3. **MomentumChart** (`src/components/MomentumChart.tsx`)
   - Graphique de momentum de match
   - Données de timeline

4. **Elite Rankings** (`src/app/elite-rankings/page.tsx`)
   - Classements par catégorie
   - Meilleurs buteurs, passeurs, gardiens

5. **Match Center** (`src/app/match-center/page.tsx`)
   - Compositions d'équipes
   - Statistiques de joueurs

## ✅ Fonctionnalités Corrigées

### 1. Bouton "More" dans BottomNav ✅

**Avant :** Le bouton "More" ne faisait rien

**Après :** 
- Ouvre un menu modal avec 5 options :
  - Profile
  - Shop
  - Tickets
  - Favorites
  - Settings
- Animation fluide de slide-up
- Fermeture par clic extérieur ou bouton X

**Utilisation :**
```tsx
// Le menu s'ouvre automatiquement au clic
<button onClick={() => setShowMoreMenu(true)}>
  <MoreHorizontal />
  <span>More</span>
</button>
```

### 2. Cards de Matchs Cliquables ✅

**Avant :** Les cards avaient `cursor-pointer` mais pas de `onClick`

**Après :**
- Clic sur une card navigue vers `/matches/{matchId}`
- Feedback visuel au survol
- IDs de matchs : 'match-1', 'match-2', 'match-3'

**Utilisation :**
```tsx
<div onClick={() => handleMatchClick('match-1')}>
  {/* Contenu de la card */}
</div>
```

## 🔧 Configuration Avancée

### Vérifier si le Mode Mock est Actif

Dans votre code, vous pouvez vérifier le mode :

```typescript
import { useMockData } from '@/config/app.config';

function MyComponent() {
  const isMockMode = useMockData();
  
  if (isMockMode) {
    // Utiliser les données mock
    return <MockData />;
  } else {
    // Appeler l'API réelle
    return <RealData />;
  }
}
```

### Créer des Données Mock Personnalisées

Pour ajouter vos propres données mock :

1. Créez un fichier dans `src/mocks/` :
   ```typescript
   // src/mocks/matches.ts
   export const MOCK_MATCHES = [
     {
       id: 'match-1',
       homeTeam: 'Barcelona',
       awayTeam: 'Copenhagen',
       homeScore: 4,
       awayScore: 1,
       status: 'finished'
     },
     // ... plus de matchs
   ];
   ```

2. Utilisez-les dans vos composants :
   ```typescript
   import { MOCK_MATCHES } from '@/mocks/matches';
   import { useMockData } from '@/config/app.config';
   
   function MatchList() {
     const isMockMode = useMockData();
     const [matches, setMatches] = useState([]);
     
     useEffect(() => {
       if (isMockMode) {
         setMatches(MOCK_MATCHES);
       } else {
         fetchMatchesFromAPI();
       }
     }, [isMockMode]);
   }
   ```

## 🎯 Bonnes Pratiques

### 1. Toujours Vérifier le Mode

```typescript
// ✅ BON
const data = useMockData() ? MOCK_DATA : await fetchFromAPI();

// ❌ MAUVAIS
const data = MOCK_DATA; // Toujours mock, même en production
```

### 2. Utiliser des Fallbacks

```typescript
try {
  const data = await fetchFromAPI();
  setData(data);
} catch (error) {
  // Fallback vers mock en cas d'erreur
  if (useMockData()) {
    setData(MOCK_DATA);
  }
}
```

### 3. Documenter les Données Mock

```typescript
/**
 * Mock data for match list
 * Used when NEXT_PUBLIC_USE_MOCK_DATA=true
 * @see src/mocks/matches.ts
 */
export const MOCK_MATCHES = [...];
```

## 🐛 Dépannage

### Le Mode Mock ne S'Active Pas

1. Vérifiez que `.env.local` existe et contient :
   ```env
   NEXT_PUBLIC_USE_MOCK_DATA=true
   ```

2. Redémarrez complètement le serveur :
   ```bash
   # Arrêtez le serveur (Ctrl+C)
   # Puis relancez
   npm run dev
   ```

3. Vérifiez dans la console du navigateur :
   ```javascript
   console.log(process.env.NEXT_PUBLIC_USE_MOCK_DATA);
   // Devrait afficher "true"
   ```

### Les Données Mock ne S'Affichent Pas

1. Vérifiez que le composant utilise bien `useMockData()` :
   ```typescript
   import { useMockData } from '@/config/app.config';
   const isMock = useMockData();
   ```

2. Vérifiez les imports des données mock :
   ```typescript
   import { MOCK_MATCHES } from '@/mocks/matches';
   ```

## 📝 Checklist de Développement

- [ ] `.env.local` créé avec `NEXT_PUBLIC_USE_MOCK_DATA=true`
- [ ] Serveur redémarré après modification de `.env.local`
- [ ] Composants utilisent `useMockData()` pour vérifier le mode
- [ ] Données mock créées dans `src/mocks/`
- [ ] Fallbacks en place pour les erreurs API
- [ ] Tests effectués en mode mock ET en mode production

## 🔗 Ressources

- **Configuration :** `web/src/config/app.config.ts`
- **Exemple d'env :** `web/.env.local.example`
- **Problèmes identifiés :** `PROBLEMES_IDENTIFIES.md`
- **Documentation Next.js :** [Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

## 💡 Conseils

1. **Développement :** Utilisez le mode mock pour développer rapidement
2. **Tests :** Testez toujours en mode production avant de déployer
3. **Démo :** Le mode mock est parfait pour les présentations
4. **Performance :** Le mode mock est plus rapide (pas d'appels réseau)

## 🎉 Prochaines Étapes

Pour connecter l'application au backend réel :

1. Configurez les variables d'environnement pour l'API :
   ```env
   NEXT_PUBLIC_USE_MOCK_DATA=false
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

2. Assurez-vous que le backend est en cours d'exécution

3. Testez les endpoints API

4. Remplacez progressivement les données mock par des appels API réels

---

**Note :** Ce guide sera mis à jour au fur et à mesure que de nouvelles fonctionnalités mock seront ajoutées.
