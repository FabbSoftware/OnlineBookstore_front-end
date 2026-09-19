import { apiClient } from '../client';
import { URLS } from '../urls';
import { Cart, AddToCartRequest, UpdateCartItemRequest } from '@/types';

export async function fetchCartApi(): Promise<Cart> {
  return apiClient<Cart>(URLS.cart.cart);
}

export async function addToCartApi(data: AddToCartRequest): Promise<Cart> {
  return apiClient<Cart>(URLS.cart.items, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCartItemApi(
  itemId: string,
  data: UpdateCartItemRequest
): Promise<Cart> {
  return apiClient<Cart>(URLS.cart.itemById(itemId), {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function removeCartItemApi(itemId: string): Promise<Cart> {
  return apiClient<Cart>(URLS.cart.itemById(itemId), {
    method: 'DELETE',
  });
}

export async function clearCartApi(): Promise<void> {
  return apiClient<void>(URLS.cart.cart, {
    method: 'DELETE',
  });
}
