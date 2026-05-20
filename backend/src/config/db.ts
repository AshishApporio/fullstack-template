import { Pool } from 'pg';
import { env } from './env';
import { logger } from '../utils/logger.util';

export const pool = new Pool({
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  max: parseInt(env.DB_POOL_MAX),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  logger.info('✅ New DB client connected');
});

pool.on('error', (err) => {
  logger.error('❌ DB pool error:', err);
  process.exit(1);
});

export const connectDB = async (): Promise<void> => {
  const client = await pool.connect();
  logger.info('✅ PostgreSQL connected');
  client.release();
};

// Generic query helper
export const query = <T = any>(
  text: string,
  params?: any[]
): Promise<{ rows: T[]; rowCount: number | null }> => {
  return pool.query(text, params);
};

// Transaction helper
export const withTransaction = async <T>(
  callback: (client: any) => Promise<T>
): Promise<T> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};
