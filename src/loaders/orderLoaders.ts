import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';
import { ordersQueryOptions } from '@/hooks/useOrders';

export const ordersLoader =
  (queryClient: QueryClient) =>
  async (_args?: LoaderFunctionArgs) => {
    return queryClient.ensureQueryData(ordersQueryOptions);
  };
