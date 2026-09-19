import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BookCatalogPage } from './BookCatalogPage';
import * as bookHooks from '@/api/book';
import { useAuthStore, useSearchStore, useToastStore } from '@/store';
import { Book } from '@/types';

const mockMutate = vi.fn();
vi.mock('@/api/cart', () => ({
  useAddToCartMutation: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
}));

vi.mock('@/api/book', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/book')>();
  return {
    ...actual,
    useBooksQuery: vi.fn(),
  };
});

describe('BookCatalogPage', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    useAuthStore.getState().logout();
    useSearchStore.getState().clearSearchQuery();
    useToastStore.getState().clearToasts();
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );

  const mockBooks: Book[] = [
    {
      id: 'book-1',
      title: 'JavaScript: The Good Parts',
      author: 'Douglas Crockford',
      price: 25.0,
      stockQuantity: 12,
    },
  ];

  it('renders catalog header and books grid', () => {
    vi.mocked(bookHooks.useBooksQuery).mockReturnValue({
      data: mockBooks,
      isLoading: false,
      isError: false,
    } as any);

    render(<BookCatalogPage />, { wrapper });

    expect(screen.getByRole('heading', { name: /Explore Our Book Collection/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /JavaScript: The Good Parts/i })).toBeInTheDocument();
  });

  it('displays active search filter and allows clearing it', () => {
    useSearchStore.getState().setSearchQuery('JavaScript');

    vi.mocked(bookHooks.useBooksQuery).mockReturnValue({
      data: mockBooks,
      isLoading: false,
      isError: false,
    } as any);

    render(<BookCatalogPage />, { wrapper });

    expect(screen.getByText(/Showing results for "JavaScript"/i)).toBeInTheDocument();
    const clearBtn = screen.getByRole('button', { name: /Clear filter/i });
    fireEvent.click(clearBtn);

    expect(useSearchStore.getState().searchQuery).toBe('');
  });

  it('renders skeleton loader when books are loading', () => {
    vi.mocked(bookHooks.useBooksQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as any);

    render(<BookCatalogPage />, { wrapper });

    expect(screen.getByTestId('book-grid-skeleton')).toBeInTheDocument();
  });

  it('calls addToCartMutation when Add to Cart is clicked by authenticated user', () => {
    useAuthStore.getState().setAuth('token-123', {
      id: 'u-1',
      email: 'user@example.com',
      fullName: 'John',
      role: 'ROLE_USER',
    });

    vi.mocked(bookHooks.useBooksQuery).mockReturnValue({
      data: mockBooks,
      isLoading: false,
      isError: false,
    } as any);

    render(<BookCatalogPage />, { wrapper });

    const addBtn = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addBtn);

    expect(mockMutate).toHaveBeenCalledWith(
      { bookId: 'book-1', quantity: 1 },
      expect.any(Object)
    );
  });

  it('redirects to /login with toast when Add to Cart is clicked by unauthenticated user', () => {
    useAuthStore.getState().logout();

    vi.mocked(bookHooks.useBooksQuery).mockReturnValue({
      data: mockBooks,
      isLoading: false,
      isError: false,
    } as any);

    render(<BookCatalogPage />, { wrapper });

    const addBtn = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addBtn);

    expect(mockMutate).not.toHaveBeenCalled();
    expect(useToastStore.getState().toasts[0].message).toBe('Please sign in to add items to your cart.');
  });
});
