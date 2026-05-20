import { PaginationMeta } from '@/types/api.types';

export const getPageNumbers = (meta: PaginationMeta): (number | '...')[] => {
  const { page, totalPages } = meta;
  const pages: (number | '...')[] = [];

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pages.push(1);
  if (page > 3) pages.push('...');
  for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
    pages.push(i);
  }
  if (page < totalPages - 2) pages.push('...');
  pages.push(totalPages);

  return pages;
};
