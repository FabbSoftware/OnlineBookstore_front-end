import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query';
import { createOrderApi, fetchOrdersApi, fetchOrderByIdApi } from '@/api/orderApi';
import { CheckoutRequest } from '@/types';

export const ordersQueryOptions = queryOptions({
  queryKey: ['orders'],
  queryFn: () => fetchOrdersApi(),
});

export const orderDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['orders', 'detail', id],
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
        queryClient.invalidateQueries({ queryKey: ['orders'] }),
        queryClient.invalidateQueries({ queryKey: ['cart'] }),
      ]);
    },
  });
}
