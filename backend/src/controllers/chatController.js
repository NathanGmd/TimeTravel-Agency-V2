import { validationResult } from 'express-validator';
import { sendChatMessage } from '../services/aiService.js';

/**
 * POST /api/chat
 * Envoie un message à l'IA Chronos et retourne la réponse
 *
 * Body: { messages: [{role: "user"|"assistant", content: string}] }
 */
export async function chat(req, res, next) {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { messages } = req.body;

    // Limite de sécurité : max 20 messages d'historique
    const trimmedMessages = messages.slice(-20);

    const reply = await sendChatMessage(trimmedMessages);

    res.json({
      success: true,
      data: {
        role: 'assistant',
        content: reply,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    // Erreur Anthropic spécifique
    if (err.status === 401) {
      return res.status(500).json({
        success: false,
        message: 'Erreur d\'authentification avec le service IA. Vérifiez ANTHROPIC_API_KEY.',
      });
    }
    next(err);
  }
}
