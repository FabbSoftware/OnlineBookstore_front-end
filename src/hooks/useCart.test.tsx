import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  cartQueryOptions,
} from './useCart';
import * as cartApi from '@/api/cartApi';
import { Cart } from '@/types';

vi.mock('@/api/cartApi', () => ({
  fetchCartApi: vi.fn(),
  addToCartApi: vi.fn(),
  updateCartItemApi: vi.fn(),
  removeCartItemApi: vi.fn(),
  clearCartApi: vi.fn(),
}));

describe('useCart hooks', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const mockCart: Cart = {
    id: 'cart-1',
    items: [
      {
        id: 'item-1',
        bookId: 'book-1',
        bookTitle: 'Clean Architecture',
        bookAuthor: 'Robert C. Martin',
        bookPrice: 35.0,
        quantity: 1,
        subtotal: 35.0,
      },
    ],
    totalItems: 1,
    totalAmount: 35.0,
  };

  it('cartQueryOptions produces expected queryKey and calls fetchCartApi', async () => {
    const options = cartQueryOptions;
    expect(options.queryKey).toEqual(['cart']);
    vi.mocked(cartApi.fetchCartApi).mockResolvedValue(mockCart);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (options.queryFn as any)();
    expect(cartApi.fetchCartApi).toHaveBeenCalled();
    expect(result).toEqual(mockCart);
  });

  it('useCartQuery fetches cart data', async () => {
    vi.mocked(cartApi.fetchCartApi).mockResolvedValue(mockCart);

    const { result } = renderHook(() => useCartQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockCart);
  });

  it('useAddToCartMutation calls addToCartApi and invalidates cart query', async () => {
    vi.mocked(cartApi.addToCartApi).mockResolvedValue(mockCart);
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useAddToCartMutation(), { wrapper });

    result.current.mutate({ bookId: 'book-1', quantity: 1 });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(cartApi.addToCartApi).toHaveBeenCalledWith({ bookId: 'book-1', quantity: 1 });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['cart'] });
  });

  it('useUpdateCartItemMutation calls updateCartItemApi and invalidates cart query', async () => {
    vi.mocked(cartApi.updateCartItemApi).mockResolvedValue(mockCart);
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useUpdateCartItemMutation(), { wrapper });

    result.current.mutate({ itemId: 'item-1', data: { quantity: 2 } });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(cartApi.updateCartItemApi).toHaveBeenCalledWith('item-1', { quantity: 2 });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['cart'] });
  });

  it('useRemoveCartItemMutation calls removeCartItemApi and invalidates cart query', async () => {
    vi.mocked(cartApi.removeCartItemApi).mockResolvedValue({ ...mockCart, items: [], totalItems: 0, totalAmount: 0 });
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useRemoveCartItemMutation(), { wrapper });

    result.current.mutate('item-1');

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(cartApi.removeCartItemApi).toHaveBeenCalledWith('item-1');
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['cart'] });
  });

  it('useClearCartMutation calls clearCartApi and invalidates cart query', async () => {
    vi.mocked(cartApi.clearCartApi).mockResolvedValue(undefined);
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useClearCartMutation(), { wrapper });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(cartApi.clearCartApi).toHaveBeenCalled();
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['cart'] });
  });
});
