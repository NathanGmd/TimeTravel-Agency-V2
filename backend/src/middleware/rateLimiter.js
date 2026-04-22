import rateLimit from 'express-rate-limit';
import { config } from '../config/index.js';

/**
 * Rate limiter global — s'applique à toutes les routes
 */
export const globalLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Trop de requêtes. Le continuum temporel doit se stabiliser. Réessayez dans quelques minutes.',
  },
});

/**
 * Rate limiter strict pour les appels IA — plus coûteux
 */
export const chatLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.chatMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Chronos doit se reposer. Limite de messages atteinte. Réessayez dans 15 minutes.',
  },
});
