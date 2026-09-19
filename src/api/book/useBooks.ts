import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchBooksApi, fetchBookByIdApi } from './bookApi';

export const BOOKS_QUERY_KEYS = {
  default: 'books',
  books: (query?: string) => [BOOKS_QUERY_KEYS.default, { query: query || '' }] as const,
  book: (id: string) => [BOOKS_QUERY_KEYS.default, 'detail', id] as const,
};

export const booksQueryOptions = (query?: string) =>
  queryOptions({
    queryKey: BOOKS_QUERY_KEYS.books(query),
    queryFn: () => fetchBooksApi(query),
  });

export const bookDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: BOOKS_QUERY_KEYS.book(id),
    queryFn: () => fetchBookByIdApi(id),
    enabled: !!id,
  });

export function useBooksQuery(query?: string) {
  return useQuery(booksQueryOptions(query));
}

export function useBookDetailQuery(id: string) {
  return useQuery(bookDetailQueryOptions(id));
}
