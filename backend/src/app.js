import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/index.js';
import { globalLimiter } from './middleware/rateLimiter.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import destinationsRouter from './routes/destinations.js';
import chatRouter from './routes/chat.js';
import bookingsRouter from './routes/bookings.js';

const app = express();

// ── Sécurité ──────────────────────────────────────────────────
app.use(helmet());
app.use(cors(config.cors));
app.use(globalLimiter);

// ── Parsing & Logging ─────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(config.isDev ? 'dev' : 'combined'));

// ── Routes ────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'TimeTravel Agency API',
    timestamp: new Date().toISOString(),
    env: config.nodeEnv,
  });
});

app.use('/api/destinations', destinationsRouter);
app.use('/api/chat', chatRouter);
app.use('/api/bookings', bookingsRouter);

// ── Error Handling ────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
