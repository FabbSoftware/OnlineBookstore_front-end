import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootLayout } from './RootLayout';

describe('RootLayout component', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  it('renders Navbar, outlet child content, and ToastContainer', () => {
    const routes = [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <div>Home Content</div>,
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    expect(screen.getByLabelText(/BookStore/i)).toBeInTheDocument();
    expect(screen.getByText('Home Content')).toBeInTheDocument();
  });
});
