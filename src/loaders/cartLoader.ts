import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';
import { cartQueryOptions } from '@/api/cart';

export const cartLoader =
  (queryClient: QueryClient) =>
  async (_args?: LoaderFunctionArgs) => {
    return queryClient.ensureQueryData(cartQueryOptions);
  };
