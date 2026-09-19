import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as client from '../client';
import { createOrderApi, fetchOrdersApi, fetchOrderByIdApi } from './orderApi';
import { URLS } from '../urls';
import { Order } from '@/types';

vi.mock('../client', () => ({
  apiClient: vi.fn(),
}));

describe('orderApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockOrder: Order = {
    id: 'order-1',
    status: 'CONFIRMED',
    createdAt: '2026-09-18T10:00:00Z',
    shippingAddress: '123 Main St',
    contactPhone: '+1-555-5555',
    totalAmount: 100.0,
    items: [],
  };

  it('createOrderApi calls POST /orders with checkout request', async () => {
    vi.mocked(client.apiClient).mockResolvedValue(mockOrder);

    const result = await createOrderApi({
      shippingAddress: '123 Main St',
      contactPhone: '+1-555-5555',
    });

    expect(client.apiClient).toHaveBeenCalledWith(URLS.orders.orders, {
      method: 'POST',
      body: JSON.stringify({
        shippingAddress: '123 Main St',
        contactPhone: '+1-555-5555',
      }),
    });
    expect(result).toEqual(mockOrder);
  });

  it('fetchOrdersApi calls GET /orders', async () => {
    vi.mocked(client.apiClient).mockResolvedValue([mockOrder]);

    const result = await fetchOrdersApi();

    expect(client.apiClient).toHaveBeenCalledWith(URLS.orders.orders);
    expect(result).toEqual([mockOrder]);
  });

  it('fetchOrderByIdApi calls GET /orders/{id}', async () => {
    vi.mocked(client.apiClient).mockResolvedValue(mockOrder);

    const result = await fetchOrderByIdApi('order-1');

    expect(client.apiClient).toHaveBeenCalledWith(URLS.orders.orderById('order-1'));
    expect(result).toEqual(mockOrder);
  });
});
