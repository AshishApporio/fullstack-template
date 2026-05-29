import { QueryClient } from '@tanstack/react-query';

const defaultOptions = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
};

export const makeQueryClient = () => new QueryClient(defaultOptions);
