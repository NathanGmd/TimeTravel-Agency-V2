/**
 * Service IA multi-provider — TimeTravel Agency
 *
 * Changer de provider : modifier AI_PROVIDER dans .env
 * Providers supportés : anthropic | openai | mistral | ollama
 */

import { config } from '../config/index.js';

// ── System Prompt (commun à tous les providers) ───────────────
const SYSTEM_PROMPT = `Tu es Chronos, le conseiller IA de TimeTravel Agency, une agence de voyages temporels futuriste et prestigieuse fondée en 2087. Tu parles en français avec élégance et un soupçon de mystère, comme un guide temporel expérimenté qui a vu défiler des millénaires.

## Tes connaissances sur l'agence

**Destinations disponibles :**
1. **Rome Impériale & Égypte Antique** (27 av. J.-C. → 476 ap. J.-C.) — À partir de 12 500 chronos-coins
   - Visite du Colisée, audience avec Cléopâtre, forums romains, pyramides
2. **Châteaux & Chevaliers d'Europe Médiévale** (500 → 1500 ap. J.-C.) — À partir de 9 800 chronos-coins
   - Tournois de chevalerie, Paris médiéval, construction de Notre-Dame
3. **Mégalopoles du 25ème Siècle** (2150 → 2500 ap. J.-C.) — À partir de 18 200 chronos-coins
   - Cités flottantes, colonies de Mars, IA conscientes

**Technologie :** Chronos-Drive™, brevetée en 2085.
**Règle absolue :** Protocole de Non-Interférence Temporelle.
**Guides :** Guides Temporels Certifiés inclus dans tous les forfaits.
**Assurance :** Assurance Paradoxe Causal incluse.

## Ton style
- Élégant, mystérieux, cultivé. Utilise des métaphores temporelles.
- Réponses concises : 2-3 paragraphes maximum.
- Encourage subtilement à réserver.
- Si hors contexte, redirige poétiquement vers les voyages temporels.

## FAQ
- Sécurité : 99,97% de succès sur 2 847 voyages. Zéro paradoxe créé.
- Annulation : remboursement total jusqu'à 48h avant départ.
- Paiement : Chronos-coins (1€ ≈ 0.8 ⊕).`;

// ── Providers ─────────────────────────────────────────────────

/**
 * Anthropic Claude
 * Modèles : claude-opus-4-5, claude-sonnet-4-5, claude-haiku-4-5
 */
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

/**
 * OpenAI — GPT-4o, GPT-4o-mini, GPT-3.5-turbo
 * Clé sur : https://platform.openai.com/api-keys
 */
async function callOpenAI(messages) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.ai.apiKey}`,
    },
    body: JSON.stringify({
      model: config.ai.model || 'gpt-4o-mini',
      max_tokens: config.ai.maxTokens,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`OpenAI error: ${err.error?.message || response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Mistral AI — mistral-large, mistral-small, open-mistral-7b
 * Clé sur : https://console.mistral.ai/
 * API quasi-identique à OpenAI
 */
async function callMistral(messages) {
  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.ai.apiKey}`,
    },
    body: JSON.stringify({
      model: config.ai.model || 'mistral-small-latest',
      max_tokens: config.ai.maxTokens,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Mistral error: ${err.message || response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Ollama — IA locale, GRATUITE, aucune clé nécessaire
 * Installer : https://ollama.com
 * Modèles : llama3, mistral, phi3, gemma2, etc.
 * Lancer : ollama run llama3
 */
async function callOllama(messages) {
  const ollamaUrl = config.ai.ollamaUrl || 'http://localhost:11434';

  const response = await fetch(`${ollamaUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: config.ai.model || 'llama3',
      stream: false,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status}. Est-ce qu'Ollama tourne ? (ollama serve)`);
  }

  const data = await response.json();
  return data.message.content;
}

/**
 * Google Gemini
 * Clé sur : https://aistudio.google.com/app/apikey
 */
async function callGemini(messages) {
  const model = config.ai.model || 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.ai.apiKey}`;

  // Gemini n'accepte pas de system message dans messages[], on l'injecte dans systemInstruction
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

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Gemini error: ${err.error?.message || response.status}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// ── Router principal ──────────────────────────────────────────

const PROVIDERS = {
  anthropic: callAnthropic,
  openai:    callOpenAI,
  mistral:   callMistral,
  ollama:    callOllama,
  gemini:    callGemini,
};

/**
 * Point d'entrée unique — appelle le bon provider selon AI_PROVIDER dans .env
 * @param {Array} messages - [{role: "user"|"assistant", content: string}]
 * @returns {Promise<string>}
 */
export async function sendChatMessage(messages) {
  const provider = (config.ai.provider || 'anthropic').toLowerCase();
  const fn = PROVIDERS[provider];

  if (!fn) {
    throw new Error(
      `Provider IA inconnu : "${provider}". Valeurs valides : ${Object.keys(PROVIDERS).join(', ')}`
    );
  }

  console.log(`[AI] Provider: ${provider} | Modèle: ${config.ai.model || 'défaut'}`);
  return fn(messages);
}
