import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchBooksApi, fetchBookByIdApi } from '@/api/bookApi';

export const booksQueryOptions = (query?: string) =>
  queryOptions({
    queryKey: ['books', { query: query || '' }],
    queryFn: () => fetchBooksApi(query),
  });

export const bookDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['books', 'detail', id],
    queryFn: () => fetchBookByIdApi(id),
    enabled: !!id,
  });

export function useBooksQuery(query?: string) {
  return useQuery(booksQueryOptions(query));
}

export function useBookDetailQuery(id: string) {
  return useQuery(bookDetailQueryOptions(id));
}
