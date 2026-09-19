import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import { catalogLoader, bookDetailLoader } from './bookLoaders';
import * as bookApi from '@/api/book/bookApi';
import { Book } from '@/types';

vi.mock('@/api/book/bookApi', () => ({
  fetchBooksApi: vi.fn(),
  fetchBookByIdApi: vi.fn(),
}));

describe('bookLoaders', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();
  });

  const mockBooks: Book[] = [
    {
      id: 'book-1',
      title: 'Domain-Driven Design',
      author: 'Eric Evans',
      price: 55.0,
      stockQuantity: 4,
    },
  ];

  it('catalogLoader pre-fetches books into queryClient', async () => {
    vi.mocked(bookApi.fetchBooksApi).mockResolvedValue(mockBooks);

    const loader = catalogLoader(queryClient);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await loader({
      request: new Request('http://localhost:5173/books?q=Domain'),
      params: {},
    } as any);

    expect(bookApi.fetchBooksApi).toHaveBeenCalledWith('Domain');
    expect(result).toEqual(mockBooks);
  });

  it('bookDetailLoader pre-fetches single book into queryClient', async () => {
    vi.mocked(bookApi.fetchBookByIdApi).mockResolvedValue(mockBooks[0]);

    const loader = bookDetailLoader(queryClient);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await loader({
      request: new Request('http://localhost:5173/books/book-1'),
      params: { id: 'book-1' },
    } as any);

    expect(bookApi.fetchBookByIdApi).toHaveBeenCalledWith('book-1');
    expect(result).toEqual(mockBooks[0]);
  });

  it('bookDetailLoader throws 400 error Response when id is missing', async () => {
    const loader = bookDetailLoader(queryClient);

    await expect(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      loader({
        request: new Request('http://localhost:5173/books'),
        params: {},
      } as any)
    ).rejects.toThrow();
  });
});
