'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface UseUrlPaginationReturn {
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  resetPage: () => void;
}

// Note: useSearchParams() requires this hook to be used inside a <Suspense> boundary.
export const useUrlPagination = (defaultLimit = 10): UseUrlPaginationReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? defaultLimit);

  const updateParams = useCallback(
    (updates: Record<string, number>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, val]) => params.set(key, String(val)));
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return {
    page,
    limit,
    setPage: (p) => updateParams({ page: p }),
    setLimit: (l) => updateParams({ limit: l, page: 1 }),
    resetPage: () => updateParams({ page: 1 }),
  };
};
