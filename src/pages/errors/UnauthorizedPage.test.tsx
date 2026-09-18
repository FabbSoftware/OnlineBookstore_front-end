import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { UnauthorizedPage } from './UnauthorizedPage';

describe('UnauthorizedPage (401 / 403)', () => {
  it('renders 401/403 access denied message with sign in and home links', () => {
    render(
      <MemoryRouter>
        <UnauthorizedPage statusCode={401} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /401 - Access Denied/i })).toBeInTheDocument();
    expect(screen.getByText(/You need to be signed in to view this page/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign In/i })).toHaveAttribute('href', '/login');
    expect(screen.getByRole('link', { name: /Back to Home/i })).toHaveAttribute('href', '/');
  });

  it('renders 403 forbidden message when status code is 403', () => {
    render(
      <MemoryRouter>
        <UnauthorizedPage statusCode={403} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /403 - Forbidden/i })).toBeInTheDocument();
    expect(screen.getByText(/You do not have permission to access this resource/i)).toBeInTheDocument();
  });
});
