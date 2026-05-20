import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { env } from './config/env';
import { httpLogger } from './middlewares/logger.middleware';
import { globalRateLimiter } from './middlewares/rateLimit.middleware';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

// Import your routes here
// import authRoutes from './routes/auth.routes';
// import userRoutes from './routes/user.routes';

const app: Application = express();

// ─── Security Middleware ───────────────────────────────
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(globalRateLimiter);

// ─── General Middleware ────────────────────────────────
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);

// ─── Health Check ──────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// ─── API Routes ────────────────────────────────────────
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', userRoutes);

// ─── Error Handlers ────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
