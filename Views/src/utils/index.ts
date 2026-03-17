import { QueryClient } from '@tanstack/react-query';

export const formatBrl = (n: number) => n.toFixed(2).replace('.', ',');

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  }
});