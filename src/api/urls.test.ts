import { describe, it, expect } from 'vitest';
import { URLS } from './urls';

describe('URLS constants', () => {
  it('contains correct static and parameterized auth endpoints', () => {
    expect(URLS.auth.login).toBe('/auth/login');
    expect(URLS.auth.register).toBe('/auth/register');
  });

  it('contains correct book endpoints with parameter function', () => {
    expect(URLS.books.books).toBe('/books');
    expect(URLS.books.bookById('book-456')).toBe('/books/book-456');
  });

  it('contains correct cart endpoints with parameter function', () => {
    expect(URLS.cart.cart).toBe('/cart');
    expect(URLS.cart.items).toBe('/cart/items');
    expect(URLS.cart.itemById('item-99')).toBe('/cart/items/item-99');
  });

  it('contains correct order endpoints with parameter function', () => {
    expect(URLS.orders.orders).toBe('/orders');
    expect(URLS.orders.orderById('order-88')).toBe('/orders/order-88');
  });
});
