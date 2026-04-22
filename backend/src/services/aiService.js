/**
 * Service IA multi-provider — TimeTravel Agency
 * Provider actif : configurable via AI_PROVIDER dans .env
 * Providers : anthropic | openai | mistral | ollama | gemini
 */

import { config } from '../config/index.js';

// ── System Prompt — Personnalité Chronos ──────────────────────
const SYSTEM_PROMPT = `Tu es Chronos, l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe fondée en 2087.

Ton rôle : conseiller les clients sur les meilleures destinations temporelles et les aider à réserver leur voyage.

## Ton ton
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)
- Réponses concises : 2-3 paragraphes maximum
- Utilise des métaphores temporelles élégantes

## Destinations que tu connais parfaitement

### Paris 1889 — Belle Époque (8 900 chronos-coins)
- Inauguration de la Tour Eiffel et Exposition Universelle
- Moulin Rouge première saison, cafés de Montmartre
- Rencontres avec les impressionnistes
- Idéal pour : amateurs d'art, gastronomie, architecture, romantisme
- Durée : 3 à 14 jours

### Crétacé — -65 millions d'années (15 500 chronos-coins)
- Safari dinosaures depuis capsule blindée sécurisée (T-Rex, Tricératops, Ptérosaures)
- Nature préhistorique sauvage, mers intérieures, forêts tropicales denses
- Observation d'un Quetzalcoatlus en vol
- Idéal pour : familles, aventuriers, amateurs de nature et paléontologie
- Durée : 2 à 7 jours

### Florence 1504 — La Renaissance (11 200 chronos-coins)
- Michel-Ange vient de finir le David, Léonard de Vinci est en ville
- Ateliers d'artistes, mécènes Médicis, architecture sublime
- Cours de fresque, visite des Offices quand c'est encore un bureau ducal
- Idéal pour : amateurs d'art, d'histoire, d'humanisme
- Durée : 5 à 21 jours

## Technologie
- Chronos-Drive™ brevetée en 2085
- Protocole de Non-Interférence Temporelle obligatoire
- Guides Temporels Certifiés inclus dans tous les forfaits
- Assurance Paradoxe Causal incluse

## FAQ
- Sécurité : 99,97% de succès, zéro paradoxe créé sur 2 847 voyages
- Annulation : remboursement total jusqu'à 48h avant le départ
- Paiement : Chronos-coins (taux : 1€ ≈ 0,8 ⊕)
- Vaccinations temporelles fournies selon la destination

## Instructions
- Suggère la destination la plus adaptée selon les intérêts du client
- Si hors contexte, redirige poétiquement vers les voyages temporels
- Encourage à réserver via le formulaire en bas de page`;

// ── Providers ─────────────────────────────────────────────────

async function callAnthropic(messages) {
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic({ apiKey: config.ai.apiKey });
  const response = await client.messages.create({
    model: config.ai.model || 'claude-haiku-4-5-20251001',
    max_tokens: config.ai.maxTokens,
    system: SYSTEM_PROMPT,
    messages,
  });
  return response.content[0].text;
}

async function callOpenAI(messages) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.ai.apiKey}` },
    body: JSON.stringify({
      model: config.ai.model || 'gpt-4o-mini',
      max_tokens: config.ai.maxTokens,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    }),
  });
  if (!response.ok) { const e = await response.json(); throw new Error(`OpenAI: ${e.error?.message}`); }
  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Mistral AI — Provider recommandé par le brief
 * Clé gratuite sur : https://console.mistral.ai/
 * Modèle par défaut : mistral-small-latest (rapide et gratuit)
 */
async function callMistral(messages) {
  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.ai.apiKey}` },
    body: JSON.stringify({
      model: config.ai.model || 'mistral-small-latest',
      max_tokens: config.ai.maxTokens,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    }),
  });
  if (!response.ok) { const e = await response.json(); throw new Error(`Mistral: ${e.message || response.status}`); }
  const data = await response.json();
  return data.choices[0].message.content;
}

async function callOllama(messages) {
  const response = await fetch(`${config.ai.ollamaUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: config.ai.model || 'llama3',
      stream: false,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    }),
  });
  if (!response.ok) throw new Error(`Ollama: ${response.status} — ollama serve est-il lancé ?`);
  const data = await response.json();
  return data.message.content;
}

async function callGemini(messages) {
  const model = config.ai.model || 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.ai.apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      generationConfig: { maxOutputTokens: config.ai.maxTokens },
    }),
  });
  if (!response.ok) { const e = await response.json(); throw new Error(`Gemini: ${e.error?.message}`); }
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// ── Router ─────────────────────────────────────────────────────

const PROVIDERS = {
  anthropic: callAnthropic,
  openai:    callOpenAI,
  mistral:   callMistral,
  ollama:    callOllama,
  gemini:    callGemini,
};

export async function sendChatMessage(messages) {
  const provider = (config.ai.provider || 'mistral').toLowerCase();
  const fn = PROVIDERS[provider];
  if (!fn) throw new Error(`Provider inconnu : "${provider}". Valides : ${Object.keys(PROVIDERS).join(', ')}`);
  console.log(`[AI] Provider: ${provider} | Modèle: ${config.ai.model || 'défaut'}`);
  return fn(messages);
}
