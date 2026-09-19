import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmptyState } from './EmptyState';
import { ShoppingBag } from 'lucide-react';

describe('EmptyState component', () => {
  it('renders title and description', () => {
    render(
      <EmptyState
        title="Your cart is empty"
        description="Looks like you haven't added anything to your cart yet."
      />
    );

    expect(screen.getByRole('heading', { name: /Your cart is empty/i })).toBeInTheDocument();
    expect(screen.getByText(/Looks like you haven't added anything to your cart yet\./i)).toBeInTheDocument();
  });

  it('renders custom icon and action button when provided', () => {
    render(
      <EmptyState
        icon={<ShoppingBag data-testid="empty-cart-icon" />}
        title="Empty"
        description="Nothing here"
        action={<button>Start Shopping</button>}
      />
    );

    expect(screen.getByTestId('empty-cart-icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start Shopping/i })).toBeInTheDocument();
  });
});
