import { QueryClient } from '@tanstack/react-query';
import { ordersQueryOptions } from '@/hooks/useOrders';

export const ordersLoader = (queryClient: QueryClient) => async () => {
  return queryClient.ensureQueryData(ordersQueryOptions);
};
