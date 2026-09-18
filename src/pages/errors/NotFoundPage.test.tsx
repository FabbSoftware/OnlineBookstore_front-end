import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage (404)', () => {
  it('renders 404 heading, message, and back to home link', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Home/i })).toHaveAttribute('href', '/');
  });

  it('renders custom message if provided', () => {
    render(
      <MemoryRouter>
        <NotFoundPage message="Book not found in inventory" />
      </MemoryRouter>
    );

    expect(screen.getByText('Book not found in inventory')).toBeInTheDocument();
  });
});
