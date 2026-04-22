import 'dotenv/config';

export const config = {
  port:    process.env.PORT    || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev:   process.env.NODE_ENV !== 'production',

  // ── IA multi-provider ────────────────────────────────────────
  // AI_PROVIDER : anthropic | openai | mistral | ollama | gemini
  // AI_API_KEY  : votre clé (inutile pour ollama)
  // AI_MODEL    : optionnel, sinon modèle par défaut du provider
  ai: {
    provider:  process.env.AI_PROVIDER  || 'anthropic',
    apiKey:    process.env.AI_API_KEY   || process.env.ANTHROPIC_API_KEY,
    model:     process.env.AI_MODEL     || null,
    maxTokens: 1024,
    ollamaUrl: process.env.OLLAMA_URL   || 'http://localhost:11434',
  },

  cors: {
    origin:      process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max:      parseInt(process.env.RATE_LIMIT_MAX)        || 100,
    chatMax:  parseInt(process.env.CHAT_RATE_LIMIT_MAX)   || 10,
  },
};

// Vérification des variables critiques au démarrage
export function validateConfig() {
  const { provider, apiKey } = config.ai;

  // Ollama est local, pas de clé requise
  if (provider !== 'ollama' && !apiKey) {
    throw new Error(
      `Clé API manquante pour le provider "${provider}".\n` +
      `→ Ajouter AI_API_KEY dans .env (ou ANTHROPIC_API_KEY pour Anthropic)\n` +
      `→ Pour tester sans clé, utiliser AI_PROVIDER=ollama`
    );
  }
}
