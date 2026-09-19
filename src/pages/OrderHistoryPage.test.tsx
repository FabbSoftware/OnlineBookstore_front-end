import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OrderHistoryPage } from './OrderHistoryPage';
import * as orderHooks from '@/hooks/useOrders';
import { Order } from '@/types';

vi.mock('@/hooks/useOrders', () => ({
  useOrdersQuery: vi.fn(),
}));

describe('OrderHistoryPage', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );

  const mockOrders: Order[] = [
    {
      id: 'order-101',
      status: 'DELIVERED',
      createdAt: '2026-09-18T14:30:00Z',
      shippingAddress: '100 Broadway, NY',
      contactPhone: '+1-555-0199',
      totalAmount: 85.0,
      items: [
        {
          id: 'item-1',
          bookId: 'b-1',
          bookTitle: 'The Pragmatic Programmer',
          bookAuthor: 'David Thomas',
          price: 42.5,
          quantity: 2,
          subtotal: 85.0,
        },
      ],
    },
  ];

  it('renders empty state when user has no orders', () => {
    vi.mocked(orderHooks.useOrdersQuery).mockReturnValue({
      data: [],
      isLoading: false,
    } as any);

    render(<OrderHistoryPage />, { wrapper });

    expect(screen.getByRole('heading', { name: /No Orders Found/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Start Shopping/i })).toHaveAttribute('href', '/');
  });

  it('renders order cards when user has past orders', () => {
    vi.mocked(orderHooks.useOrdersQuery).mockReturnValue({
      data: mockOrders,
      isLoading: false,
    } as any);

    render(<OrderHistoryPage />, { wrapper });

    expect(screen.getByRole('heading', { name: /Your Orders/i })).toBeInTheDocument();
    expect(screen.getByText(/Order #order-101/i)).toBeInTheDocument();
    expect(screen.getByText(/Delivered/i)).toBeInTheDocument();
    expect(screen.getByText('The Pragmatic Programmer')).toBeInTheDocument();
    expect(screen.getAllByText('$85.00').length).toBeGreaterThanOrEqual(1);
  });
});
