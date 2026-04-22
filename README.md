# ⏳ TimeTravel Agency

Agence de voyages temporels — Projet IA Master 1 Cybersécurité

## Stack

| Couche | Techno |
|--------|--------|
| Frontend | React 18 + Vite + React Router |
| Backend | Node.js + Express |
| IA Chatbot | **Mistral AI** (+ OpenAI, Anthropic, Gemini, Ollama) |
| Prod | Docker + docker-compose |

## Destinations

| Destination | Époque | Prix |
|-------------|--------|------|
| Paris 1889 — Belle Époque | 1889 | 8 900 ⊕ |
| Crétacé — Dinosaures | -65 000 000 | 15 500 ⊕ |
| Florence 1504 — Renaissance | 1504 | 11 200 ⊕ |

## Structure

```
timetravel-agency/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── .env.example          ← Copier en .env
│   ├── data/
│   │   ├── destinations.json
│   │   └── bookings.json
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       └── services/
│           ├── aiService.js  ← Mistral + multi-provider
│           └── dataService.js
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       └── services/
└── docs/API.md
```

---

## Démarrage en local (développement)

```bash
# 1. Configurer
cd backend && cp .env.example .env
# → Remplir AI_API_KEY dans .env
# → Clé Mistral gratuite sur https://console.mistral.ai/

# Terminal 1 — Backend
cd backend && npm install && npm run dev

# Terminal 2 — Frontend
cd frontend && npm install && npm run dev
# → http://localhost:5173
```

---

## Mise en production (Docker)

```bash
# 1. Configurer l'environnement
cp backend/.env.example .env
# Remplir : AI_API_KEY=... et FRONTEND_URL=http://VOTRE_IP

# 2. Lancer tout
docker-compose --env-file .env up -d --build

# → Site sur http://VOTRE_IP (port 80)
# → API  sur http://VOTRE_IP:3001
```

### Commandes Docker utiles

```bash
docker-compose logs -f          # Logs en direct
docker-compose restart          # Redémarrer
docker-compose down             # Arrêter
docker-compose up -d --build    # Rebuild après modif
```

---

## Changer de provider IA

Modifier `.env` :

```bash
# Mistral (recommandé — gratuit pour débuter)
AI_PROVIDER=mistral
AI_API_KEY=votre-cle-mistral   # console.mistral.ai

# OpenAI
AI_PROVIDER=openai
AI_API_KEY=sk-proj-...

# Gemini (quota gratuit généreux)
AI_PROVIDER=gemini
AI_API_KEY=...                 # aistudio.google.com

# Ollama (100% local, sans clé)
AI_PROVIDER=ollama
# → Installer ollama.com puis : ollama run llama3
```

---

## Routes API

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /api/health | Santé du serveur |
| GET | /api/destinations | Liste des 3 destinations |
| GET | /api/destinations/:id | Détail d'une destination |
| POST | /api/chat | Message au chatbot Chronos |
| POST | /api/bookings | Créer une réservation |
| GET | /api/bookings | Lister les réservations |
