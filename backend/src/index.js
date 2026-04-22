import app from './app.js';
import { config, validateConfig } from './config/index.js';

// Validation des variables d'environnement critiques
try {
  validateConfig();
} catch (err) {
  console.error('❌ Configuration invalide:', err.message);
  process.exit(1);
}

const server = app.listen(config.port, () => {
  console.log(`
╔════════════════════════════════════════╗
║       ⏳ TimeTravel Agency API         ║
╠════════════════════════════════════════╣
║  Environnement : ${config.nodeEnv.padEnd(21)}║
║  URL           : http://localhost:${config.port}  ║
║  Health        : /api/health           ║
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM reçu. Fermeture du serveur...');
  server.close(() => process.exit(0));
});
