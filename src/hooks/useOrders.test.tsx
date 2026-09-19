import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useOrdersQuery,
  useCheckoutMutation,
  ordersQueryOptions,
  orderDetailQueryOptions,
} from './useOrders';
import * as orderApi from '@/api/orderApi';
import { Order } from '@/types';

vi.mock('@/api/orderApi', () => ({
  createOrderApi: vi.fn(),
  fetchOrdersApi: vi.fn(),
  fetchOrderByIdApi: vi.fn(),
}));

describe('useOrders hooks', () => {
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

  const mockOrder: Order = {
    id: 'order-1',
    status: 'CONFIRMED',
    createdAt: '2026-09-18T10:00:00Z',
    shippingAddress: '456 Elm St',
    contactPhone: '+1-555-9999',
    totalAmount: 60.0,
    items: [],
  };

  it('ordersQueryOptions produces expected queryKey and calls fetchOrdersApi', async () => {
    const options = ordersQueryOptions;
    expect(options.queryKey).toEqual(['orders']);
    vi.mocked(orderApi.fetchOrdersApi).mockResolvedValue([mockOrder]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (options.queryFn as any)();
    expect(orderApi.fetchOrdersApi).toHaveBeenCalled();
    expect(result).toEqual([mockOrder]);
  });

  it('orderDetailQueryOptions produces expected queryKey and calls fetchOrderByIdApi', async () => {
    const options = orderDetailQueryOptions('order-1');
    expect(options.queryKey).toEqual(['orders', 'detail', 'order-1']);
    vi.mocked(orderApi.fetchOrderByIdApi).mockResolvedValue(mockOrder);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (options.queryFn as any)();
    expect(orderApi.fetchOrderByIdApi).toHaveBeenCalledWith('order-1');
    expect(result).toEqual(mockOrder);
  });

  it('useOrdersQuery fetches orders list', async () => {
    vi.mocked(orderApi.fetchOrdersApi).mockResolvedValue([mockOrder]);

    const { result } = renderHook(() => useOrdersQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([mockOrder]);
  });

  it('useCheckoutMutation creates order and invalidates orders and cart caches', async () => {
    vi.mocked(orderApi.createOrderApi).mockResolvedValue(mockOrder);
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useCheckoutMutation(), { wrapper });

    result.current.mutate({
      shippingAddress: '456 Elm St',
      contactPhone: '+1-555-9999',
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(orderApi.createOrderApi).toHaveBeenCalledWith({
      shippingAddress: '456 Elm St',
      contactPhone: '+1-555-9999',
    });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['orders'] });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['cart'] });
    expect(invalidateSpy).toHaveBeenCalledTimes(2);
  });
});
