import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import { ordersLoader } from './orderLoaders';
import * as orderApi from '@/api/orderApi';
import { Order } from '@/types';

vi.mock('@/api/orderApi', () => ({
  fetchOrdersApi: vi.fn(),
}));

describe('orderLoaders', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();
  });

  const mockOrders: Order[] = [
    {
      id: 'order-1',
      status: 'DELIVERED',
      createdAt: '2026-09-18T10:00:00Z',
      shippingAddress: '123 Main St',
      contactPhone: '+1-555-0000',
      totalAmount: 49.99,
      items: [],
    },
  ];

  it('ordersLoader pre-fetches orders into queryClient', async () => {
    vi.mocked(orderApi.fetchOrdersApi).mockResolvedValue(mockOrders);

    const loader = ordersLoader(queryClient);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await loader({ request: new Request('http://localhost:5173/orders'), params: {} } as any);

    expect(orderApi.fetchOrdersApi).toHaveBeenCalled();
    expect(result).toEqual(mockOrders);
  });
});
