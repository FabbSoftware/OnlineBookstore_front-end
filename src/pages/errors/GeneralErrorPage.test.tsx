import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { GeneralErrorPage } from './GeneralErrorPage';

describe('GeneralErrorPage', () => {
  it('renders generic error details and back to home link', () => {
    render(
      <MemoryRouter>
        <GeneralErrorPage message="Network connection lost" />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Something Went Wrong/i })).toBeInTheDocument();
    expect(screen.getByText(/Network connection lost/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Home/i })).toHaveAttribute('href', '/');
  });
});
