import { apiClient } from '../client';
import { URLS } from '../urls';
import { Book } from '@/types';

export async function fetchBooksApi(query?: string): Promise<Book[]> {
  return apiClient<Book[]>(URLS.books.books, {
    params: { query },
  });
}

export async function fetchBookByIdApi(id: string): Promise<Book> {
  return apiClient<Book>(URLS.books.bookById(id));
}
