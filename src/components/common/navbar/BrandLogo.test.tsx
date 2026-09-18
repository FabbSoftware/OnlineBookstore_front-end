import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';

describe('BrandLogo component', () => {
  it('renders brand logo icon and title linking to home', () => {
    render(
      <MemoryRouter>
        <BrandLogo />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /BookStore/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
    expect(screen.getByLabelText(/BookStore/i)).toBeInTheDocument();
  });
});
