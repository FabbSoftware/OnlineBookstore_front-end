import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CheckoutPage } from './CheckoutPage';
import * as cartHooks from '@/hooks/useCart';
import * as orderHooks from '@/hooks/useOrders';
import { Cart } from '@/types';

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

vi.mock('@/hooks/useCart', () => ({
  useCartQuery: vi.fn(),
}));

vi.mock('@/hooks/useOrders', () => ({
  useCheckoutMutation: vi.fn(),
}));

describe('CheckoutPage', () => {
  let queryClient: QueryClient;
  const mockMutateCheckout = vi.fn();

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
    vi.clearAllMocks();
    mockedNavigate.mockReset();

    vi.mocked(orderHooks.useCheckoutMutation).mockReturnValue({
      mutate: mockMutateCheckout,
      isPending: false,
    } as any);
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );

  const mockCart: Cart = {
    id: 'cart-1',
    items: [
      {
        id: 'item-1',
        bookId: 'b-1',
        bookTitle: 'Clean Code',
        bookAuthor: 'Robert C. Martin',
        bookPrice: 30.0,
        quantity: 1,
        subtotal: 30.0,
      },
    ],
    totalItems: 1,
    totalAmount: 30.0,
  };

  it('renders checkout form and order summary', () => {
    vi.mocked(cartHooks.useCartQuery).mockReturnValue({
      data: mockCart,
      isLoading: false,
    } as any);

    render(<CheckoutPage />, { wrapper });

    expect(screen.getByRole('heading', { name: /Checkout/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Shipping Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Phone/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Place Order/i })).toBeInTheDocument();
  });

  it('validates required fields on submit', async () => {
    vi.mocked(cartHooks.useCartQuery).mockReturnValue({
      data: mockCart,
      isLoading: false,
    } as any);

    render(<CheckoutPage />, { wrapper });

    fireEvent.click(screen.getByRole('button', { name: /Place Order/i }));

    expect(await screen.findByText(/Shipping address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
  });

  it('submits order and navigates to /orders on success', async () => {
    vi.mocked(cartHooks.useCartQuery).mockReturnValue({
      data: mockCart,
      isLoading: false,
    } as any);

    mockMutateCheckout.mockImplementation((data, { onSuccess }) => {
      onSuccess({ id: 'order-123' });
    });

    render(<CheckoutPage />, { wrapper });

    fireEvent.change(screen.getByLabelText(/Shipping Address/i), {
      target: { value: '123 Main St, New York, NY' },
    });
    fireEvent.change(screen.getByLabelText(/Contact Phone/i), {
      target: { value: '+1 (555) 123-4567' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Place Order/i }));

    await waitFor(() => {
      expect(mockMutateCheckout).toHaveBeenCalledWith(
        {
          shippingAddress: '123 Main St, New York, NY',
          contactPhone: '+1 (555) 123-4567',
        },
        expect.anything()
      );
      expect(mockedNavigate).toHaveBeenCalledWith('/orders');
    });
  });
});
