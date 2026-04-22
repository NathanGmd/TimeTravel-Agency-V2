# ⏳ TimeTravel Agency

Agence de voyages temporels — Projet IA Master 1 Cybersécurité

## Stack

| Couche | Techno |
|--------|--------|
| Frontend | React 18 + Vite + React Router |
| Backend | Node.js + Express |
| IA | Multi-provider (Anthropic, OpenAI, Mistral, Gemini, Ollama) |
| Prod | Docker + docker-compose |

## Structure

```
timetravel-agency/
├── docker-compose.yml        ← Lancer tout le projet
├── backend/
│   ├── Dockerfile
│   ├── .env.example          ← Copier en .env et remplir
│   ├── data/                 ← destinations.json + bookings.json
│   └── src/
│       ├── config/           ← Variables d'environnement
│       ├── controllers/      ← Logique métier
│       ├── middleware/        ← Sécurité, validation, rate limit
│       ├── routes/           ← Endpoints API
│       └── services/         ← aiService (IA), dataService (JSON)
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/
│       ├── components/       ← layout/, sections/, ui/
│       ├── hooks/            ← useChat, useBooking, useToast
│       ├── pages/            ← HomePage, DestinationsPage
│       └── services/         ← api.js (appels backend)
└── docs/
    └── API.md
```

---

## Démarrage en développement local

### 1. Configurer la clé API

```bash
cd backend
cp .env.example .env
# Éditer .env → remplir AI_API_KEY
```

### 2. Lancer backend + frontend

```bash
# Terminal 1
cd backend && npm install && npm run dev

# Terminal 2
cd frontend && npm install && npm run dev
```

→ App sur http://localhost:5173

---

## Mise en production avec Docker

### 1. Configurer l'environnement

```bash
cp backend/.env.example .env
# Remplir dans .env :
#   AI_API_KEY=sk-ant-...
#   AI_PROVIDER=anthropic
#   FRONTEND_URL=http://VOTRE_IP_OU_DOMAINE
```

### 2. Lancer avec docker-compose

```bash
docker-compose --env-file .env up -d --build
```

→ Frontend sur http://localhost (port 80)  
→ Backend sur http://localhost:3001

### Commandes utiles

```bash
# Voir les logs
docker-compose logs -f

# Redémarrer
docker-compose restart

# Arrêter
docker-compose down

# Rebuild après modif du code
docker-compose up -d --build
```

---

## Providers IA supportés

Changer `AI_PROVIDER` dans `.env` :

| Provider | AI_PROVIDER | Clé |
|----------|-------------|-----|
| Anthropic Claude | `anthropic` | console.anthropic.com |
| OpenAI GPT | `openai` | platform.openai.com |
| Mistral | `mistral` | console.mistral.ai |
| Google Gemini | `gemini` | aistudio.google.com (gratuit) |
| Ollama (local) | `ollama` | aucune clé requise |

---

## Routes API

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /api/health | Santé du serveur |
| GET | /api/destinations | Liste des destinations |
| GET | /api/destinations/:id | Détail destination |
| POST | /api/chat | Message au chatbot IA |
| POST | /api/bookings | Créer une réservation |
| GET | /api/bookings | Lister les réservations |
