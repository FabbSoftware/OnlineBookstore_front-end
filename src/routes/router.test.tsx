import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { createTestRouter } from './router';
import { useAuthStore } from '@/store/useAuthStore';
import * as bookApi from '@/api/bookApi';
import * as cartApi from '@/api/cartApi';

vi.mock('@/api/bookApi');
vi.mock('@/api/cartApi');

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

    vi.mocked(bookApi.getBooks).mockResolvedValue({
      books: [
        {
          id: 'b-1',
          title: 'Clean Code',
          author: 'Robert C. Martin',
          price: 30.0,
          description: 'A handbook of agile software craftsmanship',
          coverImageUrl: 'https://example.com/cover.jpg',
          category: 'Software Engineering',
          stock: 10,
          rating: 4.8,
        },
      ],
      total: 1,
    });

    vi.mocked(cartApi.getCart).mockResolvedValue({
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

    await waitFor(() => {
      expect(screen.getByText('Clean Code')).toBeInTheDocument();
    });
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

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Sign In to Your Account/i })).toBeInTheDocument();
    });
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
