import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useBooksQuery, useBookDetailQuery, booksQueryOptions, bookDetailQueryOptions } from './useBooks';
import * as bookApi from '@/api/bookApi';
import { Book } from '@/types';

vi.mock('@/api/bookApi', () => ({
  fetchBooksApi: vi.fn(),
  fetchBookByIdApi: vi.fn(),
}));

describe('useBooks hooks', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const mockBooks: Book[] = [
    {
      id: 'book-1',
      title: 'Refactoring',
      author: 'Martin Fowler',
      price: 49.99,
      stockQuantity: 7,
    },
  ];

  it('booksQueryOptions produces expected queryKey and calls fetchBooksApi', async () => {
    const options = booksQueryOptions('Martin');
    expect(options.queryKey).toEqual(['books', { query: 'Martin' }]);
    vi.mocked(bookApi.fetchBooksApi).mockResolvedValue(mockBooks);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (options.queryFn as any)();
    expect(bookApi.fetchBooksApi).toHaveBeenCalledWith('Martin');
    expect(result).toEqual(mockBooks);
  });

  it('bookDetailQueryOptions produces expected queryKey and calls fetchBookByIdApi', async () => {
    const options = bookDetailQueryOptions('book-1');
    expect(options.queryKey).toEqual(['books', 'detail', 'book-1']);
    vi.mocked(bookApi.fetchBookByIdApi).mockResolvedValue(mockBooks[0]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (options.queryFn as any)();
    expect(bookApi.fetchBookByIdApi).toHaveBeenCalledWith('book-1');
    expect(result).toEqual(mockBooks[0]);
  });

  it('useBooksQuery fetches books successfully', async () => {
    vi.mocked(bookApi.fetchBooksApi).mockResolvedValue(mockBooks);

    const { result } = renderHook(() => useBooksQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockBooks);
  });

  it('useBookDetailQuery fetches single book by id successfully', async () => {
    vi.mocked(bookApi.fetchBookByIdApi).mockResolvedValue(mockBooks[0]);

    const { result } = renderHook(() => useBookDetailQuery('book-1'), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockBooks[0]);
  });
});
