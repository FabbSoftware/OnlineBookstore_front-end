import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartPage } from './CartPage';
import * as cartHooks from '@/api/cart';
import { Cart } from '@/types';

vi.mock('@/api/cart', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/cart')>();
  return {
    ...actual,
    useCartQuery: vi.fn(),
    useUpdateCartItemMutation: vi.fn(),
    useRemoveCartItemMutation: vi.fn(),
    useClearCartMutation: vi.fn(),
  };
});

describe('CartPage', () => {
  let queryClient: QueryClient;
  const mockMutateUpdate = vi.fn();
  const mockMutateRemove = vi.fn();
  const mockMutateClear = vi.fn();

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();

    vi.mocked(cartHooks.useUpdateCartItemMutation).mockReturnValue({
      mutate: mockMutateUpdate,
      isPending: false,
    } as any);

    vi.mocked(cartHooks.useRemoveCartItemMutation).mockReturnValue({
      mutate: mockMutateRemove,
      isPending: false,
    } as any);

    vi.mocked(cartHooks.useClearCartMutation).mockReturnValue({
      mutate: mockMutateClear,
      isPending: false,
    } as any);
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );

  const mockCartWithItems: Cart = {
    id: 'cart-1',
    items: [
      {
        id: 'item-101',
        bookId: 'b-1',
        bookTitle: 'Clean Code',
        bookAuthor: 'Robert C. Martin',
        bookPrice: 30.0,
        quantity: 2,
        subtotal: 60.0,
      },
    ],
    totalItems: 2,
    totalAmount: 60.0,
  };

  const emptyCart: Cart = {
    id: 'cart-1',
    items: [],
    totalItems: 0,
    totalAmount: 0,
  };

  it('renders empty cart state when cart has no items', () => {
    vi.mocked(cartHooks.useCartQuery).mockReturnValue({
      data: emptyCart,
      isLoading: false,
      isError: false,
    } as any);

    render(<CartPage />, { wrapper });

    expect(screen.getByRole('heading', { name: /Your Cart is Empty/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore Books/i })).toHaveAttribute('href', '/');
  });

  it('renders cart items and order summary when cart has items', () => {
    vi.mocked(cartHooks.useCartQuery).mockReturnValue({
      data: mockCartWithItems,
      isLoading: false,
      isError: false,
    } as any);

    render(<CartPage />, { wrapper });

    expect(screen.getByRole('heading', { name: /^Shopping Cart$/i })).toBeInTheDocument();
    expect(screen.getByText('Clean Code')).toBeInTheDocument();
    expect(screen.getByText('Robert C. Martin')).toBeInTheDocument();
    expect(screen.getAllByText('Subtotal').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('heading', { name: /Order Summary/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Proceed to Checkout/i })).toHaveAttribute('href', '/checkout');
  });

  it('handles item quantity updates', () => {
    vi.mocked(cartHooks.useCartQuery).mockReturnValue({
      data: mockCartWithItems,
      isLoading: false,
      isError: false,
    } as any);

    render(<CartPage />, { wrapper });

    const incBtn = screen.getByRole('button', { name: /Increase quantity/i });
    fireEvent.click(incBtn);

    expect(mockMutateUpdate).toHaveBeenCalledWith({
      itemId: 'item-101',
      data: { quantity: 3 },
    });
  });

  it('handles item removal', () => {
    vi.mocked(cartHooks.useCartQuery).mockReturnValue({
      data: mockCartWithItems,
      isLoading: false,
      isError: false,
    } as any);

    render(<CartPage />, { wrapper });

    const removeBtn = screen.getByRole('button', { name: /Remove item/i });
    fireEvent.click(removeBtn);

    expect(mockMutateRemove).toHaveBeenCalledWith('item-101');
  });

  it('handles clear cart action', () => {
    vi.mocked(cartHooks.useCartQuery).mockReturnValue({
      data: mockCartWithItems,
      isLoading: false,
      isError: false,
    } as any);

    render(<CartPage />, { wrapper });

    const clearBtn = screen.getByRole('button', { name: /Clear Cart/i });
    fireEvent.click(clearBtn);

    expect(mockMutateClear).toHaveBeenCalled();
  });

  it('renders skeleton loader when cart is loading', () => {
    vi.mocked(cartHooks.useCartQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as any);

    render(<CartPage />, { wrapper });

    expect(screen.getByTestId('cart-skeleton')).toBeInTheDocument();
  });
});
