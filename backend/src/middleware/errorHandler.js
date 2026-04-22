import { config } from '../config/index.js';

/**
 * Middleware de gestion d'erreurs global
 * Doit être déclaré APRÈS toutes les routes dans app.js
 */
export function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);

  const status = err.status || err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message || 'Une erreur interne est survenue.',
    // Stack trace uniquement en développement
    ...(config.isDev && { stack: err.stack }),
  });
}

/**
 * Middleware pour les routes non trouvées (404)
 */
export function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} introuvable dans le continuum temporel.`,
  });
}
