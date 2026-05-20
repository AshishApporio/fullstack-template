import { Request } from 'express';
import { PaginationMeta } from './response.util';

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export const getPaginationParams = (req: Request): PaginationParams => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

export const buildPaginationMeta = (
  total: number,
  page: number,
  limit: number
): PaginationMeta => {
  const totalPages = Math.ceil(total / limit);
  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

// Build SQL pagination clause
export const paginationSQL = (limit: number, offset: number): string => {
  return `LIMIT ${limit} OFFSET ${offset}`;
};
