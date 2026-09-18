import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { RouteErrorBoundary } from './RouteErrorBoundary';
import * as reactRouter from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useRouteError: vi.fn(),
    isRouteErrorResponse: (error: unknown): error is { status: number; statusText: string; data: unknown } =>
      typeof error === 'object' && error !== null && 'status' in error,
  };
});

describe('RouteErrorBoundary', () => {
  it('renders 404 message when route error status is 404', () => {
    vi.mocked(reactRouter.useRouteError).mockReturnValue({
      status: 404,
      statusText: 'Not Found',
      data: 'Page does not exist',
    });

    render(
      <MemoryRouter>
        <RouteErrorBoundary />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Home/i })).toHaveAttribute('href', '/');
  });

  it('renders general error message and reload button for unexpected error', () => {
    vi.mocked(reactRouter.useRouteError).mockReturnValue(new Error('Network failure'));

    render(
      <MemoryRouter>
        <RouteErrorBoundary />
      </MemoryRouter>
    );

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Network failure/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Try Again/i })).toBeInTheDocument();
  });
});
