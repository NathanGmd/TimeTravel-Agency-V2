# ⏳ TimeTravel Agency

> Projet IA — Master 1 Cybersécurité  
> Webapp interactive d'une agence de voyages temporels fictive

---

## Description

TimeTravel Agency est une application web full-stack simulant une agence de voyages temporels de luxe. Elle permet aux utilisateurs de découvrir trois destinations historiques uniques, d'interagir avec un conseiller IA conversationnel (Chronos), et de soumettre des demandes de réservation.

Le projet met en œuvre une architecture moderne séparée frontend/backend, une intégration d'IA générative via API, et un déploiement conteneurisé avec Docker.

---

## Technologies utilisées

### Frontend
| Technologie | Rôle |
|-------------|------|
| React 18 | Framework UI |
| Vite | Bundler & serveur de dev |
| React Router v6 | Navigation SPA |
| CSS Modules | Styles scopés par composant |
| Canvas API (natif) | Visuels génératifs des destinations |

### Backend
| Technologie | Rôle |
|-------------|------|
| Node.js 20 | Runtime JavaScript |
| Express 4 | Serveur HTTP & routage |
| Helmet | Sécurisation des headers HTTP |
| CORS | Contrôle des origines autorisées |
| express-rate-limit | Protection contre les abus (rate limiting) |
| express-validator | Validation des entrées utilisateur |
| Morgan | Logging des requêtes HTTP |

### Intelligence Artificielle
| Technologie | Rôle |
|-------------|------|
| Mistral AI API | Provider IA principal (chatbot Chronos) |
| Architecture multi-provider | Support OpenAI, Anthropic, Gemini, Ollama |

### Infrastructure & Déploiement
| Technologie | Rôle |
|-------------|------|
| Docker | Conteneurisation backend & frontend |
| docker-compose | Orchestration multi-conteneurs |
| Nginx | Serveur web frontend en production |

---

## Features implémentées

### Page d'accueil
- Hero section avec animation de portail temporel (CSS pur, anneaux rotatifs)
- Champ d'étoiles animé en Canvas 2D
- Horloge analogique temps réel
- Statistiques de l'agence
- Défilement fluide entre sections

### Galerie des destinations
- 3 cards interactives avec visuels génératifs Canvas 2D uniques :
  - 🗼 **Paris 1889** — Tour Eiffel, silhouettes haussmanniennes, ciel Belle Époque
  - 🦕 **Crétacé -65M** — dinosaures, forêts préhistoriques, atmosphère primitive
  - 🎨 **Florence 1504** — dôme Brunelleschi, clocher Giotto, ciel Renaissance
- Modal détaillée par destination (highlights, inclusions, tarifs, avertissements)
- Données statiques en fallback (affichage garanti même sans backend)
- Bouton "Réserver" avec scroll automatique vers le formulaire

### Agent conversationnel (Chatbot Chronos)
- Widget flottant en bas à droite (bulle ⏳, s'ouvre au clic)
- Badge de notification pour les messages non lus
- Suggestions rapides contextuelles au démarrage
- Historique de conversation maintenu en mémoire
- Indicateur de frappe animé pendant la réponse de l'IA
- Personnalité définie : conseiller temporel élégant et cultivé
- Architecture multi-provider : Mistral, OpenAI, Anthropic, Gemini, Ollama

### Formulaire de réservation
- Sélection de destination, nombre de voyageurs, date, durée
- Validation côté client et côté serveur (express-validator)
- Pré-sélection automatique de la destination depuis une card
- Confirmation visuelle après soumission
- Persistance des réservations en JSON côté backend

### Sécurité backend
- Headers HTTP sécurisés (Helmet)
- CORS restreint à l'origine frontend
- Rate limiting global (100 req/15min) et strict sur /api/chat (10 req/15min)
- Validation et sanitisation de toutes les entrées
- Variables d'environnement pour toutes les données sensibles

---

## Outils IA utilisés (transparence)

Ce projet a été développé avec l'assistance de l'IA à plusieurs niveaux :

| Outil | Usage |
|-------|-------|
| **Claude (Anthropic)** | Génération du code source complet (architecture, composants React, API Express, Dockerfiles) |
| **Mistral AI** | Moteur du chatbot Chronos en production (API conversationnelle) |

Le code généré a été relu, compris et validé. L'architecture, les choix technologiques et la direction créative ont été supervisés par l'étudiant dans le cadre du projet "vibecoding".

---

## Instructions d'installation

### Prérequis
- Node.js >= 18
- npm
- Docker & docker-compose (pour la prod)
- Une clé API Mistral (gratuite sur [console.mistral.ai](https://console.mistral.ai/))

### Développement local

```bash
# 1. Cloner / dézipper le projet
cd timetravel-agency

# 2. Configurer le backend
cd backend
cp .env.example .env
# Ouvrir .env et remplir :
#   AI_API_KEY=votre-cle-mistral
#   AI_PROVIDER=mistral

# 3. Lancer le backend (Terminal 1)
npm install
npm run dev
# → API disponible sur http://localhost:3001

# 4. Lancer le frontend (Terminal 2)
cd ../frontend
npm install
npm run dev
# → App disponible sur http://localhost:5173
```

### Production avec Docker

```bash
# 1. Configurer l'environnement
cp backend/.env.example .env
# Remplir dans .env :
#   AI_API_KEY=votre-cle-mistral
#   FRONTEND_URL=http://VOTRE_IP_OU_DOMAINE

# 2. Build et lancement
docker-compose --env-file .env up -d --build

# → Frontend : http://VOTRE_IP (port 80)
# → Backend  : http://VOTRE_IP:3001
```

**Commandes utiles :**
```bash
docker-compose logs -f        # Logs en temps réel
docker-compose down           # Arrêter
docker-compose up -d --build  # Redémarrer après modification
```

---

## Structure du projet

```
timetravel-agency/
├── docker-compose.yml
├── docs/
│   └── API.md                        ← Documentation des routes API
│
├── backend/
│   ├── Dockerfile
│   ├── .env.example                  ← Variables d'environnement (modèle)
│   ├── data/
│   │   ├── destinations.json         ← Données des 3 destinations
│   │   └── bookings.json             ← Réservations persistées
│   └── src/
│       ├── index.js                  ← Point d'entrée
│       ├── app.js                    ← Setup Express
│       ├── config/index.js           ← Configuration centralisée
│       ├── controllers/              ← Logique métier (destinations, chat, bookings)
│       ├── middleware/               ← Sécurité, validation, rate limiting, erreurs
│       ├── routes/                   ← Définition des endpoints
│       └── services/
│           ├── aiService.js          ← Multi-provider IA (Mistral, OpenAI, etc.)
│           └── dataService.js        ← Lecture/écriture JSON
│
└── frontend/
    ├── Dockerfile
    ├── nginx.conf
    ├── vite.config.js                ← Proxy /api → backend en dev
    └── src/
        ├── App.jsx                   ← Routing + providers globaux
        ├── pages/                    ← HomePage, DestinationsPage
        ├── components/
        │   ├── layout/               ← Navbar, Footer
        │   ├── sections/             ← Hero, About, Destinations, Booking
        │   └── ui/                   ← ChatWidget (bulle), Modal, Toast, Cursor
        ├── hooks/                    ← useChat, useBooking, useToast
        ├── services/api.js           ← Couche d'appels API centralisée
        └── assets/styles/global.css ← Variables CSS, reset, animations
```

---

## Routes API

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/health` | Santé du serveur |
| GET | `/api/destinations` | Liste des 3 destinations |
| GET | `/api/destinations/:id` | Détail d'une destination |
| POST | `/api/chat` | Message au chatbot Chronos (IA) |
| POST | `/api/bookings` | Soumettre une réservation |
| GET | `/api/bookings` | Lister les réservations |

---

## Crédits

### APIs & Modèles IA
| Ressource | Fournisseur | Lien |
|-----------|-------------|------|
| Mistral Small (chatbot) | Mistral AI | [mistral.ai](https://mistral.ai) |
| Claude Sonnet (génération du code) | Anthropic | [anthropic.com](https://anthropic.com) |

### Librairies & Frameworks
| Ressource | Licence |
|-----------|---------|
| React | MIT |
| Vite | MIT |
| Express | MIT |
| Helmet | MIT |
| express-rate-limit | MIT |
| express-validator | MIT |
| Docker | Apache 2.0 |
| Nginx | BSD-2-Clause |

### Polices
| Police | Fournisseur |
|--------|-------------|
| Cinzel Decorative | Google Fonts (OFL) |
| Cormorant Garamond | Google Fonts (OFL) |
| JetBrains Mono | Google Fonts (OFL) |

---

## Auteur

Projet réalisé dans le cadre du cours IA — Master 1 Cybersécurité  
Approche : **vibecoding** — développement assisté par IA avec supervision humaine
