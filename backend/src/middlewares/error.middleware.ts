import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.util';
import { sendError } from '../utils/response.util';
import { logger } from '../utils/logger.util';
import { env } from '../config/env';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(err);

  // Known operational error
  if (err instanceof AppError) {
    sendError(res, err.message, err.statusCode, err.errors);
    return;
  }

  // PostgreSQL unique violation
  if ((err as any).code === '23505') {
    sendError(res, 'Duplicate entry — resource already exists', 409);
    return;
  }

  // PostgreSQL foreign key violation
  if ((err as any).code === '23503') {
    sendError(res, 'Related resource not found', 400);
    return;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    sendError(res, 'Invalid token', 401);
    return;
  }
  if (err.name === 'TokenExpiredError') {
    sendError(res, 'Token expired', 401);
    return;
  }

  // Unknown error — don't leak details in production
  const message = env.NODE_ENV === 'development' ? err.message : 'Internal server error';
  sendError(res, message, 500);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  sendError(res, `Route ${req.originalUrl} not found`, 404);
};
