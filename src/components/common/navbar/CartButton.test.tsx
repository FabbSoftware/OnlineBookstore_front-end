import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CartButton } from './CartButton';

describe('CartButton component', () => {
  it('renders cart link pointing to /cart', () => {
    render(
      <MemoryRouter>
        <CartButton itemCount={0} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /shopping cart/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/cart');
  });

  it('does not display badge count when itemCount is 0', () => {
    render(
      <MemoryRouter>
        <CartButton itemCount={0} />
      </MemoryRouter>
    );

    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('displays badge count when itemCount > 0', () => {
    render(
      <MemoryRouter>
        <CartButton itemCount={4} />
      </MemoryRouter>
    );

    expect(screen.getByText('4')).toBeInTheDocument();
  });
});
