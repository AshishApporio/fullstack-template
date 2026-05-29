import app from './app';
import { connectDB, pool } from './config/db';
import { env } from './config/env';
import { logger } from './utils/logger.util';

const PORT = parseInt(env.PORT);

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} in ${env.NODE_ENV} mode`);
    });

    const shutdown = (signal: string) => {
      logger.info(`${signal} received. Shutting down gracefully...`);
      server.close(() => {
        pool.end()
          .then(() => {
            logger.info('💤 Server closed');
            process.exit(0);
          })
          .catch((err: Error) => {
            logger.error('Error draining DB pool:', err);
            process.exit(1);
          });
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('unhandledRejection', (reason: unknown) => {
      logger.error('Unhandled rejection:', reason);
      shutdown('unhandledRejection');
    });

  } catch (err) {
    logger.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
