import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { getRoutes } from './router';
import { useAuthStore } from '@/store';
import * as bookApi from '@/api/book/bookApi';
import * as cartApi from '@/api/cart/cartApi';

const createTestRouter = (queryClient: QueryClient, initialEntries: string[] = ['/']) => {
  return createMemoryRouter(getRoutes(queryClient), { initialEntries });
};

vi.mock('@/api/book/bookApi', () => ({
  fetchBooksApi: vi.fn(),
  fetchBookByIdApi: vi.fn(),
}));

vi.mock('@/api/cart/cartApi', () => ({
  fetchCartApi: vi.fn(),
}));

describe('Bookstore Router', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
    useAuthStore.getState().logout();
    vi.clearAllMocks();

    vi.mocked(bookApi.fetchBooksApi).mockResolvedValue([
      {
        id: 'b-1',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        price: 30.0,
        description: 'A handbook of agile software craftsmanship',
        coverImageUrl: 'https://example.com/cover.jpg',
        stockQuantity: 10,
        isbn: '9780132350884',
      },
    ]);

    vi.mocked(cartApi.fetchCartApi).mockResolvedValue({
      id: 'cart-1',
      items: [],
      totalItems: 0,
      totalAmount: 0,
    });
  });

  it('renders catalog page on root route ("/")', async () => {
    const router = createTestRouter(queryClient, ['/']);
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    await waitFor(
      () => {
        expect(screen.getByText('Clean Code')).toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  });

  it('renders login page on "/login"', async () => {
    const router = createTestRouter(queryClient, ['/login']);
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    expect(screen.getByRole('heading', { name: /Sign In to Your Account/i })).toBeInTheDocument();
  });

  it('renders register page on "/register"', async () => {
    const router = createTestRouter(queryClient, ['/register']);
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    expect(screen.getByRole('heading', { name: /Create an Account/i })).toBeInTheDocument();
  });

  it('redirects unauthenticated user from "/checkout" to "/login"', async () => {
    const router = createTestRouter(queryClient, ['/checkout']);
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    await waitFor(
      () => {
        expect(screen.getByRole('heading', { name: /Sign In to Your Account/i })).toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  });

  it('renders 404 NotFoundPage for non-existent route', async () => {
    const router = createTestRouter(queryClient, ['/does-not-exist']);
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
  });
});
