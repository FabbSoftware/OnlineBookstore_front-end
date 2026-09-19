import { apiClient } from './client';
import { Cart, AddToCartRequest, UpdateCartItemRequest } from '@/types';

export async function fetchCartApi(): Promise<Cart> {
  return apiClient<Cart>('/cart');
}

export async function addToCartApi(data: AddToCartRequest): Promise<Cart> {
  return apiClient<Cart>('/cart/items', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCartItemApi(
  itemId: string,
  data: UpdateCartItemRequest
): Promise<Cart> {
  return apiClient<Cart>(`/cart/items/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function removeCartItemApi(itemId: string): Promise<Cart> {
  return apiClient<Cart>(`/cart/items/${itemId}`, {
    method: 'DELETE',
  });
}

export async function clearCartApi(): Promise<void> {
  return apiClient<void>('/cart', {
    method: 'DELETE',
  });
}
