import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BookCatalogPage } from './BookCatalogPage';
import * as bookHooks from '@/hooks/useBooks';
import { useSearchStore } from '@/store/useSearchStore';
import { Book } from '@/types';

vi.mock('@/hooks/useBooks', () => ({
  useBooksQuery: vi.fn(),
}));

describe('BookCatalogPage', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    useSearchStore.getState().clearSearchQuery();
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
});
