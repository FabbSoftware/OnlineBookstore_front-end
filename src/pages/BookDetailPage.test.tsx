import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BookDetailPage } from './BookDetailPage';
import * as bookHooks from '@/api/book';
import { useAuthStore, useToastStore } from '@/store';
import { Book } from '@/types';

const mockDetailMutate = vi.fn();
vi.mock('@/api/cart', () => ({
  useAddToCartMutation: () => ({
    mutate: mockDetailMutate,
    isPending: false,
  }),
}));

vi.mock('@/api/book', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/book')>();
  return {
    ...actual,
    useBookDetailQuery: vi.fn(),
  };
});

describe('BookDetailPage', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    useAuthStore.getState().logout();
    useToastStore.getState().clearToasts();
    vi.clearAllMocks();
  });

  const mockBook: Book = {
    id: 'book-99',
    title: 'The Pragmatic Programmer',
    author: 'David Thomas, Andrew Hunt',
    price: 49.99,
    isbn: '978-0135957059',
    description: 'Your journey to mastery in software development.',
    stockQuantity: 5,
    coverImageUrl: 'https://example.com/pragmatic.jpg',
  };

  const renderComponent = (bookId = 'book-99') => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/books/${bookId}`]}>
          <Routes>
            <Route path="/books/:id" element={<BookDetailPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it('renders book details including title, author, price, description and isbn', () => {
    vi.mocked(bookHooks.useBookDetailQuery).mockReturnValue({
      data: mockBook,
      isLoading: false,
      isError: false,
    } as any);

    renderComponent();

    expect(screen.getByRole('heading', { name: /The Pragmatic Programmer/i })).toBeInTheDocument();
    expect(screen.getByText(/David Thomas, Andrew Hunt/i)).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();
    expect(screen.getByText(/978-0135957059/i)).toBeInTheDocument();
    expect(screen.getByText(/Your journey to mastery in software development\./i)).toBeInTheDocument();
    expect(screen.getByText(/5 in stock/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Catalog/i })).toHaveAttribute('href', '/');
  });

  it('handles quantity increment and decrement within stock limits', () => {
    vi.mocked(bookHooks.useBookDetailQuery).mockReturnValue({
      data: mockBook,
      isLoading: false,
      isError: false,
    } as any);

    renderComponent();

    const incrementBtn = screen.getByRole('button', { name: /Increase quantity/i });
    const decrementBtn = screen.getByRole('button', { name: /Decrease quantity/i });
    const quantityDisplay = screen.getByTestId('quantity-display');

    expect(quantityDisplay).toHaveTextContent('1');

    fireEvent.click(incrementBtn);
    expect(quantityDisplay).toHaveTextContent('2');

    fireEvent.click(decrementBtn);
    expect(quantityDisplay).toHaveTextContent('1');

    // Decrement when at 1 should stay 1
    fireEvent.click(decrementBtn);
    expect(quantityDisplay).toHaveTextContent('1');
  });

  it('does not increment quantity beyond available stock and disables increment button', () => {
    vi.mocked(bookHooks.useBookDetailQuery).mockReturnValue({
      data: mockBook, // stockQuantity is 5
      isLoading: false,
      isError: false,
    } as any);

    renderComponent();

    const incrementBtn = screen.getByRole('button', { name: /Increase quantity/i });
    const quantityDisplay = screen.getByTestId('quantity-display');

    // Increment 4 times to reach max stock (5)
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    expect(quantityDisplay).toHaveTextContent('5');

    // Trying to increment further should not exceed stock
    fireEvent.click(incrementBtn);
    expect(quantityDisplay).toHaveTextContent('5');
    expect(incrementBtn).toBeDisabled();
  });

  it('renders skeleton loader when book detail is loading', () => {
    vi.mocked(bookHooks.useBookDetailQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as any);

    renderComponent();

    expect(screen.getByTestId('book-detail-skeleton')).toBeInTheDocument();
  });

  it('renders not found state when book is not available', () => {
    vi.mocked(bookHooks.useBookDetailQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Book not found'),
    } as any);

    renderComponent();

    expect(screen.getByRole('heading', { name: /Book Not Found/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Return to Catalog/i })).toHaveAttribute('href', '/');
  });

  it('calls addToCartMutation with selected quantity when Add to Cart is clicked by authenticated user', () => {
    useAuthStore.getState().setAuth('token-123', {
      id: 'u-1',
      email: 'user@example.com',
      fullName: 'John',
      role: 'ROLE_USER',
    });

    vi.mocked(bookHooks.useBookDetailQuery).mockReturnValue({
      data: mockBook,
      isLoading: false,
      isError: false,
    } as any);

    renderComponent();

    // Increase quantity to 2
    const incrementBtn = screen.getByRole('button', { name: /Increase quantity/i });
    fireEvent.click(incrementBtn);

    const addBtn = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addBtn);

    expect(mockDetailMutate).toHaveBeenCalledWith(
      { bookId: 'book-99', quantity: 2 },
      expect.any(Object)
    );
  });

  it('redirects to /login and shows toast when Add to Cart is clicked by unauthenticated user', () => {
    useAuthStore.getState().logout();

    vi.mocked(bookHooks.useBookDetailQuery).mockReturnValue({
      data: mockBook,
      isLoading: false,
      isError: false,
    } as any);

    renderComponent();

    const addBtn = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addBtn);

    expect(mockDetailMutate).not.toHaveBeenCalled();
    expect(useToastStore.getState().toasts[0].message).toBe('Please sign in to add items to your cart.');
  });
});
