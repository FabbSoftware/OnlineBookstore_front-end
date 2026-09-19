import { apiClient } from './client';
import { Book } from '@/types';

export async function fetchBooksApi(query?: string): Promise<Book[]> {
  return apiClient<Book[]>('/books', {
    params: { query },
  });
}

export async function fetchBookByIdApi(id: string): Promise<Book> {
  return apiClient<Book>(`/books/${id}`);
}
