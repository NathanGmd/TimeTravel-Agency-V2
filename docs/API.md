# TimeTravel Agency — Documentation API

Base URL : `http://localhost:3001/api`

---

## GET /health

Vérifie que le serveur est opérationnel.

**Réponse 200**
```json
{
  "status": "ok",
  "service": "TimeTravel Agency API",
  "timestamp": "2087-01-01T00:00:00.000Z",
  "env": "development"
}
```

---

## GET /destinations

Retourne toutes les destinations disponibles.

**Réponse 200**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "ancient",
      "era": "Antiquité",
      "title": "Rome Impériale & Égypte Antique",
      "period": "27 av. J.-C. → 476 ap. J.-C.",
      "price": 12500,
      "currency": "chronos-coins",
      "difficulty": "Intermédiaire",
      "rating": 4.9,
      ...
    }
  ]
}
```

---

## GET /destinations/:id

Retourne une destination par son identifiant (`ancient`, `medieval`, `future`).

**Réponse 200** — même structure que ci-dessus (objet unique dans `data`)

**Réponse 404**
```json
{ "success": false, "message": "Destination temporelle introuvable." }
```

---

## POST /chat

Envoie un message à l'IA Chronos. L'historique de conversation est géré côté client.

**Body**
```json
{
  "messages": [
    { "role": "user", "content": "Quelles destinations proposez-vous ?" }
  ]
}
```

> `messages` : tableau de 1 à 20 éléments. Chaque `role` est `"user"` ou `"assistant"`.

**Réponse 200**
```json
{
  "success": true,
  "data": {
    "role": "assistant",
    "content": "Bonjour voyageur ! Nous proposons trois destinations...",
    "timestamp": "2087-01-01T12:00:00.000Z"
  }
}
```

**Réponse 400** — validation échouée
```json
{
  "success": false,
  "errors": [{ "msg": "messages doit être un tableau...", "path": "messages" }]
}
```

**Rate limit** : 10 requêtes / 15 minutes par IP.

---

## POST /bookings

Crée une nouvelle réservation de voyage temporel.

**Body**
```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean@exemple.com",
  "phone": "+33612345678",
  "destinationId": "ancient",
  "travelers": 2,
  "departureDate": "2087-06-15",
  "duration": "week",
  "notes": "Allergie aux toges en laine"
}
```

| Champ | Type | Requis | Valeurs |
|-------|------|--------|---------|
| firstName | string | ✅ | 2–50 chars |
| lastName | string | ✅ | 2–50 chars |
| email | string | ✅ | email valide |
| phone | string | ❌ | téléphone valide |
| destinationId | string | ✅ | `ancient`, `medieval`, `future` |
| travelers | integer | ✅ | 1–10 |
| departureDate | ISO date | ✅ | date future |
| duration | string | ✅ | `weekend`, `week`, `2weeks`, `month` |
| notes | string | ❌ | max 1000 chars |

**Réponse 201**
```json
{
  "success": true,
  "message": "Voyage temporel initié avec succès !...",
  "data": {
    "id": "uuid-v4",
    "status": "pending",
    "destination": "Rome Impériale & Égypte Antique",
    "departureDate": "2087-06-15",
    "totalPrice": 25000,
    "currency": "chronos-coins"
  }
}
```

---

## GET /bookings

Liste toutes les réservations (usage dev/admin).

**Réponse 200**
```json
{
  "success": true,
  "count": 12,
  "data": [ ... ]
}
```

---

## Codes d'erreur communs

| Code | Signification |
|------|---------------|
| 400 | Validation échouée — voir `errors[]` |
| 404 | Ressource introuvable |
| 429 | Trop de requêtes (rate limit) |
| 500 | Erreur serveur interne |
