import { apiClient } from '../client';
import { URLS } from '../urls';
import { Order, CheckoutRequest } from '@/types';

export async function createOrderApi(data: CheckoutRequest): Promise<Order> {
  return apiClient<Order>(URLS.orders.orders, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function fetchOrdersApi(): Promise<Order[]> {
  return apiClient<Order[]>(URLS.orders.orders);
}

export async function fetchOrderByIdApi(id: string): Promise<Order> {
  return apiClient<Order>(URLS.orders.orderById(id));
}
