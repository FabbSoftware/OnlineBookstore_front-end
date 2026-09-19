import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';
import { booksQueryOptions, bookDetailQueryOptions } from '@/hooks/useBooks';

export const catalogLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q') || undefined;
    return queryClient.ensureQueryData(booksQueryOptions(query));
  };

export const bookDetailLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;
    if (!id) {
      throw new Response('Book ID is required', { status: 400 });
    }
    return queryClient.ensureQueryData(bookDetailQueryOptions(id));
  };
