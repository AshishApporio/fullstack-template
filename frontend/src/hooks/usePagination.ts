import { useState } from 'react';

interface UsePaginationReturn {
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  resetPage: () => void;
}

export const usePagination = (defaultLimit = 10): UsePaginationReturn => {
  const [page, setPageState] = useState(1);
  const [limit, setLimit] = useState(defaultLimit);

  const setPage = (newPage: number) => setPageState(newPage);
  const resetPage = () => setPageState(1);

  return { page, limit, setPage, setLimit, resetPage };
};
