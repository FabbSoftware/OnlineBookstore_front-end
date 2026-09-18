import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './RootLayout';

describe('RootLayout component', () => {
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
    render(<RouterProvider router={router} />);

    expect(screen.getByLabelText(/BookStore/i)).toBeInTheDocument();
    expect(screen.getByText('Home Content')).toBeInTheDocument();
  });
});
