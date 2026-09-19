import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query';
import {
  fetchCartApi,
  addToCartApi,
  updateCartItemApi,
  removeCartItemApi,
  clearCartApi,
} from './cartApi';
import { AddToCartRequest, UpdateCartItemRequest } from '@/types';

export const CART_QUERY_KEYS = {
  default: 'cart',
  cart: () => [CART_QUERY_KEYS.default] as const,
};

export const cartQueryOptions = queryOptions({
  queryKey: CART_QUERY_KEYS.cart(),
  queryFn: () => fetchCartApi(),
});

export function useCartQuery() {
  return useQuery(cartQueryOptions);
}

export function useAddToCartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddToCartRequest) => addToCartApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart() });
    },
  });
}

export function useUpdateCartItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, data }: { itemId: string; data: UpdateCartItemRequest }) =>
      updateCartItemApi(itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart() });
    },
  });
}

export function useRemoveCartItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => removeCartItemApi(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart() });
    },
  });
}

export function useClearCartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => clearCartApi(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart() });
    },
  });
}
