import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query';
import { createOrderApi, fetchOrdersApi, fetchOrderByIdApi } from './orderApi';
import { CART_QUERY_KEYS } from '../cart/useCart';
import { CheckoutRequest } from '@/types';

export const ORDERS_QUERY_KEYS = {
  default: 'orders',
  orders: () => [ORDERS_QUERY_KEYS.default] as const,
  order: (id: string) => [ORDERS_QUERY_KEYS.default, 'detail', id] as const,
};

export const ordersQueryOptions = queryOptions({
  queryKey: ORDERS_QUERY_KEYS.orders(),
  queryFn: () => fetchOrdersApi(),
});

export const orderDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ORDERS_QUERY_KEYS.order(id),
    queryFn: () => fetchOrderByIdApi(id),
    enabled: !!id,
  });

export function useOrdersQuery() {
  return useQuery(ordersQueryOptions);
}

export function useOrderByIdQuery(id: string) {
  return useQuery(orderDetailQueryOptions(id));
}

export function useCheckoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CheckoutRequest) => createOrderApi(data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.orders() }),
        queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart() }),
      ]);
    },
  });
}
