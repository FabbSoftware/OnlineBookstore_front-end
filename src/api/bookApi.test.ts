import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as client from './client';
import { fetchBooksApi, fetchBookByIdApi } from './bookApi';
import { Book } from '@/types';

vi.mock('./client', () => ({
  apiClient: vi.fn(),
}));

describe('bookApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockBooks: Book[] = [
    {
      id: 'book-1',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      price: 29.99,
      stockQuantity: 10,
    },
    {
      id: 'book-2',
      title: 'The Pragmatic Programmer',
      author: 'David Thomas',
      price: 39.99,
      stockQuantity: 5,
    },
  ];

  it('fetchBooksApi calls /books without query when none provided', async () => {
    vi.mocked(client.apiClient).mockResolvedValue(mockBooks);

    const result = await fetchBooksApi();

    expect(client.apiClient).toHaveBeenCalledWith('/books', {
      params: { query: undefined },
    });
    expect(result).toEqual(mockBooks);
  });

  it('fetchBooksApi passes query parameter when provided', async () => {
    vi.mocked(client.apiClient).mockResolvedValue([mockBooks[0]]);

    const result = await fetchBooksApi('Clean');

    expect(client.apiClient).toHaveBeenCalledWith('/books', {
      params: { query: 'Clean' },
    });
    expect(result).toEqual([mockBooks[0]]);
  });

  it('fetchBookByIdApi calls /books/{id}', async () => {
    vi.mocked(client.apiClient).mockResolvedValue(mockBooks[0]);

    const result = await fetchBookByIdApi('book-1');

    expect(client.apiClient).toHaveBeenCalledWith('/books/book-1');
    expect(result).toEqual(mockBooks[0]);
  });
});
