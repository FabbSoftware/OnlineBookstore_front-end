export const URLS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  books: {
    books: '/books',
    bookById: (id: string) => `/books/${id}`,
  },
  cart: {
    cart: '/cart',
    items: '/cart/items',
    itemById: (itemId: string) => `/cart/items/${itemId}`,
  },
  orders: {
    orders: '/orders',
    orderById: (id: string) => `/orders/${id}`,
  },
} as const;
