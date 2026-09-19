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
  it('renders NotFoundPage when error status is 404', () => {
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
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });

  it('renders UnauthorizedPage when error status is 401', () => {
    vi.mocked(reactRouter.useRouteError).mockReturnValue({
      status: 401,
      statusText: 'Unauthorized',
      data: null,
    });

    render(
      <MemoryRouter>
        <RouteErrorBoundary />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /401 - Access Denied/i })).toBeInTheDocument();
  });

  it('renders UnauthorizedPage when error status is 403', () => {
    vi.mocked(reactRouter.useRouteError).mockReturnValue({
      status: 403,
      statusText: 'Forbidden',
      data: null,
    });

    render(
      <MemoryRouter>
        <RouteErrorBoundary />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /403 - Forbidden/i })).toBeInTheDocument();
  });

  it('renders ServerErrorPage when error status is 500', () => {
    vi.mocked(reactRouter.useRouteError).mockReturnValue({
      status: 500,
      statusText: 'Internal Server Error',
      data: null,
    });

    render(
      <MemoryRouter>
        <RouteErrorBoundary />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /500 - Server Error/i })).toBeInTheDocument();
  });

  it('renders GeneralErrorPage for unexpected errors', () => {
    vi.mocked(reactRouter.useRouteError).mockReturnValue(new Error('Network connection failed'));

    render(
      <MemoryRouter>
        <RouteErrorBoundary />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Something Went Wrong/i })).toBeInTheDocument();
    expect(screen.getByText(/Network connection failed/i)).toBeInTheDocument();
  });
});
