import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import { createMemoryRouter } from 'react-router-dom';
import App from './App';
import { getRoutes } from './routes/router';
import * as bookApi from '@/api/bookApi';
import * as cartApi from '@/api/cartApi';

vi.mock('@/api/bookApi');
vi.mock('@/api/cartApi');

describe('App', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
    vi.clearAllMocks();
    vi.mocked(bookApi.fetchBooksApi).mockResolvedValue([]);
    vi.mocked(cartApi.fetchCartApi).mockResolvedValue({
      id: 'cart-1',
      items: [],
      totalItems: 0,
      totalAmount: 0,
    });
  });

  it('renders application with navbar brand', async () => {
    const testRouter = createMemoryRouter(getRoutes(queryClient), { initialEntries: ['/'] });
    render(<App router={testRouter} queryClient={queryClient} />);
    await waitFor(() => {
      expect(screen.getByLabelText(/BookStore/i)).toBeInTheDocument();
    });
  });
});
