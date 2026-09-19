import { QueryClient } from '@tanstack/react-query';
import { cartQueryOptions } from '@/hooks/useCart';

export const cartLoader = (queryClient: QueryClient) => async () => {
  return queryClient.ensureQueryData(cartQueryOptions);
};
