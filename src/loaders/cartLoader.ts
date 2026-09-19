import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';
import { cartQueryOptions } from '@/hooks/useCart';

export const cartLoader =
  (queryClient: QueryClient) =>
  async (_args?: LoaderFunctionArgs) => {
    return queryClient.ensureQueryData(cartQueryOptions);
  };
