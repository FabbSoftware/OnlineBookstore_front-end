import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as client from './client';
import {
  fetchCartApi,
  addToCartApi,
  updateCartItemApi,
  removeCartItemApi,
  clearCartApi,
} from './cartApi';
import { Cart } from '@/types';

vi.mock('./client', () => ({
  apiClient: vi.fn(),
}));

describe('cartApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockCart: Cart = {
    id: 'cart-1',
    items: [
      {
        id: 'item-1',
        bookId: 'book-1',
        bookTitle: 'Clean Code',
        bookAuthor: 'Robert C. Martin',
        bookPrice: 29.99,
        quantity: 2,
        subtotal: 59.98,
      },
    ],
    totalItems: 2,
    totalAmount: 59.98,
  };

  it('fetchCartApi calls GET /cart', async () => {
    vi.mocked(client.apiClient).mockResolvedValue(mockCart);

    const result = await fetchCartApi();

    expect(client.apiClient).toHaveBeenCalledWith('/cart');
    expect(result).toEqual(mockCart);
  });

  it('addToCartApi calls POST /cart/items', async () => {
    vi.mocked(client.apiClient).mockResolvedValue(mockCart);

    const result = await addToCartApi({ bookId: 'book-1', quantity: 2 });

    expect(client.apiClient).toHaveBeenCalledWith('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ bookId: 'book-1', quantity: 2 }),
    });
    expect(result).toEqual(mockCart);
  });

  it('updateCartItemApi calls PUT /cart/items/{itemId}', async () => {
    vi.mocked(client.apiClient).mockResolvedValue(mockCart);

    const result = await updateCartItemApi('item-1', { quantity: 3 });

    expect(client.apiClient).toHaveBeenCalledWith('/cart/items/item-1', {
      method: 'PUT',
      body: JSON.stringify({ quantity: 3 }),
    });
    expect(result).toEqual(mockCart);
  });

  it('removeCartItemApi calls DELETE /cart/items/{itemId}', async () => {
    vi.mocked(client.apiClient).mockResolvedValue({ ...mockCart, items: [], totalItems: 0, totalAmount: 0 });

    const result = await removeCartItemApi('item-1');

    expect(client.apiClient).toHaveBeenCalledWith('/cart/items/item-1', {
      method: 'DELETE',
    });
    expect(result.items).toHaveLength(0);
  });

  it('clearCartApi calls DELETE /cart', async () => {
    vi.mocked(client.apiClient).mockResolvedValue(undefined);

    await clearCartApi();

    expect(client.apiClient).toHaveBeenCalledWith('/cart', {
      method: 'DELETE',
    });
  });
});
