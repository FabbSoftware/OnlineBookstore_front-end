import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ServerErrorPage } from './ServerErrorPage';

describe('ServerErrorPage (500)', () => {
  it('renders 500 heading, message, retry button and home link', () => {
    render(
      <MemoryRouter>
        <ServerErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /500 - Server Error/i })).toBeInTheDocument();
    expect(screen.getByText(/Something went wrong on our servers/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Try Again/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Home/i })).toHaveAttribute('href', '/');
  });
});
