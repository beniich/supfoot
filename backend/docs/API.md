# 📡 Documentation API - UCL AI Agent

Base URL: `http://localhost:5000`

---

## 🏥 Santé & Status

### `GET /health`

Vérifier la santé du serveur.

**Réponse:**

```json
{
  "status": "healthy",
  "timestamp": "2024-02-04T12:00:00.000Z",
  "uptime": 3600.5,
  "environment": "development"
}
```

### `GET /api/ai/health`

Vérifier la santé de l'agent IA.

**Réponse:**

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "ollama": true,
    "qdrant": true,
    "model": "llama3.1"
  }
}
```

---

## 🤖 Insights IA

### `GET /api/ai/insights/match/:matchId`

Obtenir l'analyse IA d'un match spécifique.

**Paramètres:**
- `matchId` (string) - ID du match

**Exemple:**

```bash
curl http://localhost:5000/api/ai/insights/match/12345
```

**Réponse:**

```json
{
  "success": true,
  "data": {
    "match": {
      "matchId": "12345",
      "fixture": "Real Madrid vs Bayern Munich",
      "score": "2-1",
      "result": "home_win",
      "date": "2024-04-09",
      "venue": "Santiago Bernabéu",
      "status": "finished"
    },
    "analysis": {
      "summary": "Real Madrid a dominé le match...",
      "keyInsights": [
        "Possession dominante du Real (65%)",
        "Bayern efficace en contre-attaque",
        "Vinicius Jr. décisif avec 1 but et 1 passe"
      ],
      "tacticalAnalysis": {
        "formation": "4-3-3",
        "strengths": ["Pression haute", "Jeu sur les ailes"],
        "weaknesses": ["Défense centrale fragile"]
      },
      "keyPlayers": [
        {
          "name": "Vinicius Jr.",
          "role": "Ailier gauche",
          "impact": "1 but, 1 passe décisive"
        }
      ],
      "prediction": {
        "outcome": "home_win",
        "confidence": 0.78,
        "probabilities": {
          "homeWin": 0.55,
          "draw": 0.25,
          "awayWin": 0.20
        },
        "reasoning": "Real Madrid a l'avantage à domicile..."
      }
    },
    "confidence": 0.78,
    "generatedAt": "2024-02-04T12:00:00.000Z",
    "viewCount": 42
  }
}
```

---

## 🎯 Analyse & Prédictions

### `POST /api/ai/analyze/match`

Analyser un match manuellement (déclenche une nouvelle analyse IA).

**⚠️ Rate limit:** 10 requêtes/minute

**Body:**

```json
{
  "matchId": "12345"
}
```

**Exemple:**

```bash
curl -X POST http://localhost:5000/api/ai/analyze/match \
  -H "Content-Type: application/json" \
  -d '{"matchId": "12345"}'
```

**Réponse:**

```json
{
  "success": true,
  "data": {
    "summary": "...",
    "keyInsights": ["..."],
    "tacticalAnalysis": {...},
    "prediction": {...}
  }
}
```

### `POST /api/ai/predict`

Prédire l'issue d'un match futur.

**⚠️ Rate limit:** 10 requêtes/minute

**Body:**

```json
{
  "team1": "Real Madrid",
  "team2": "Bayern Munich",
  "matchContext": {
    "venue": "home",
    "competition": "Champions League",
    "stage": "semi_final"
  }
}
```

**Exemple:**

```bash
curl -X POST http://localhost:5000/api/ai/predict \
  -H "Content-Type: application/json" \
  -d '{
    "team1": "Real Madrid",
    "team2": "Bayern Munich",
    "matchContext": {"venue": "home"}
  }'
```

**Réponse:**

```json
{
  "success": true,
  "data": {
    "prediction": "home_win",
    "confidence": 0.72,
    "probabilities": {
      "homeWin": 0.50,
      "draw": 0.30,
      "awayWin": 0.20
    },
    "keyFactors": [
      "Avantage du terrain",
      "Forme récente de Real Madrid",
      "Historique des confrontations"
    ],
    "reasoning": "Real Madrid devrait gagner grâce à..."
  }
}
```

### `POST /api/ai/summary/season`

Générer un résumé de saison.

**⚠️ Rate limit:** 10 requêtes/minute

**Body:**

```json
{
  "season": "2024/2025",
  "teamName": "Real Madrid"  // optionnel
}
```

**Réponse:**

```json
{
  "success": true,
  "data": {
    "season": "2024/2025",
    "team": "Real Madrid",
    "summary": "La saison 2024/2025 de Real Madrid...",
    "keyMoments": [
      "Victoire 3-1 contre Manchester City",
      "Qualification dramatique contre Bayern"
    ],
    "topPerformers": [
      {
        "name": "Vinicius Jr.",
        "team": "Real Madrid",
        "achievement": "10 buts en phase finale"
      }
    ],
    "statistics": {
      "totalMatches": 13,
      "totalGoals": 28,
      "topScorer": "Vinicius Jr. (10)"
    }
  }
}
```

---

## 💬 Chat Conversationnel

### `POST /api/ai/chat`

Discuter avec l'agent IA.

**⚠️ Rate limit:** 10 requêtes/minute

**Body:**

```json
{
  "message": "Qui a marqué le plus de buts en Ligue des Champions cette saison?",
  "history": [
    {
      "role": "user",
      "content": "Bonjour!"
    },
    {
      "role": "assistant",
      "content": "Bonjour! Comment puis-je vous aider?"
    }
  ]
}
```

**Exemple:**

```bash
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Qui a marqué le plus de buts?",
    "history": []
  }'
```

**Réponse:**

```json
{
  "success": true,
  "data": {
    "message": "D'après les données disponibles, c'est Erling Haaland avec 12 buts...",
    "sources": [
      {
        "score": 0.89,
        "type": "player_profile",
        "summary": "Erling Haaland - Manchester City..."
      }
    ]
  }
}
```

---

## 🔍 Recherche & Connaissances

### `GET /api/ai/search`

Recherche sémantique dans les connaissances IA.

**⚠️ Rate limit:** 10 requêtes/minute

**Paramètres:**
- `q` (string, required) - Requête de recherche
- `limit` (number, optional) - Nombre de résultats (défaut: 5)

**Exemple:**

```bash
curl "http://localhost:5000/api/ai/search?q=Real%20Madrid%20tactiques&limit=3"
```

**Réponse:**

```json
{
  "success": true,
  "data": [
    {
      "score": 0.92,
      "type": "tactical_insight",
      "summary": "Analyse tactique Real Madrid vs Bayern...",
      "season": "2024/2025"
    }
  ],
  "count": 3
}
```

### `GET /api/ai/knowledge/recent`

Récupérer les connaissances récentes.

**Paramètres:**
- `type` (string, optional) - Type de connaissance
- `limit` (number, optional) - Nombre de résultats (défaut: 10)

**Types disponibles:**
- `match_analysis`
- `player_profile`
- `season_summary`
- `tactical_insight`
- `prediction`
- `team_comparison`
- `historical_data`

**Exemple:**

```bash
curl "http://localhost:5000/api/ai/knowledge/recent?type=match_analysis&limit=5"
```

**Réponse:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "type": "match_analysis",
      "processedData": {
        "summary": "...",
        "insights": ["..."]
      },
      "confidence": 0.85,
      "createdAt": "2024-02-04T12:00:00.000Z"
    }
  ],
  "count": 5
}
```

### `GET /api/ai/knowledge/stats`

Statistiques des connaissances IA.

**Exemple:**

```bash
curl http://localhost:5000/api/ai/knowledge/stats
```

**Réponse:**

```json
{
  "success": true,
  "data": {
    "total": 1234,
    "validated": 856,
    "byType": [
      {
        "_id": "match_analysis",
        "count": 456,
        "avgConfidence": 0.78,
        "totalViews": 12345
      },
      {
        "_id": "prediction",
        "count": 234,
        "avgConfidence": 0.72,
        "totalViews": 5678
      }
    ]
  }
}
```

### `POST /api/ai/knowledge/:id/feedback`

Ajouter un feedback sur une connaissance.

**Body:**

```json
{
  "rating": 5,
  "comment": "Excellente analyse!"
}
```

**Exemple:**

```bash
curl -X POST http://localhost:5000/api/ai/knowledge/507f1f77bcf86cd799439011/feedback \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "comment": "Très utile!"}'
```

**Réponse:**

```json
{
  "success": true,
  "data": {
    "averageRating": 4.7,
    "feedbackCount": 23
  }
}
```

---

## 🚨 Codes d'Erreur

| Code | Description |
|------|-------------|
| `200` | Succès |
| `400` | Requête invalide (paramètres manquants) |
| `404` | Ressource non trouvée |
| `429` | Trop de requêtes (rate limit atteint) |
| `500` | Erreur serveur interne |

**Format d'erreur:**

```json
{
  "success": false,
  "error": "Message d'erreur explicite"
}
```

---

## 🔒 Authentification

**Actuellement:** Aucune authentification requise (développement)

**À venir:** JWT tokens pour la production

---

## 📊 Rate Limits

| Endpoint | Limite |
|----------|--------|
| `/api/ai/analyze/*` | 10 req/min |
| `/api/ai/predict` | 10 req/min |
| `/api/ai/chat` | 10 req/min |
| `/api/ai/search` | 10 req/min |
| Autres | 100 req/min |

**Header de réponse:**

```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1707048000
```

---

## 💡 Exemples d'Utilisation

### JavaScript/Fetch

```javascript
// Récupérer les insights d'un match
const fetchMatchInsights = async (matchId) => {
  const response = await fetch(
    `http://localhost:5000/api/ai/insights/match/${matchId}`
  );
  const data = await response.json();
  return data.data;
};

// Chat avec l'agent
const chatWithAI = async (message) => {
  const response = await fetch('http://localhost:5000/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  const data = await response.json();
  return data.data.message;
};
```

### Python

```python
import requests

# Prédire un match
def predict_match(team1, team2):
    response = requests.post(
        'http://localhost:5000/api/ai/predict',
        json={
            'team1': team1,
            'team2': team2
        }
    )
    return response.json()['data']

# Recherche sémantique
def search_knowledge(query, limit=5):
    response = requests.get(
        'http://localhost:5000/api/ai/search',
        params={'q': query, 'limit': limit}
    )
    return response.json()['data']
```

---

## 📚 Ressources

- [Guide d'Installation](./INSTALLATION.md)
- [Documentation Complète](./README.md)
- [Exemples de Code](./examples/)
