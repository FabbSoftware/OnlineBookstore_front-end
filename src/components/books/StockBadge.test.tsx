import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StockBadge } from './StockBadge';

describe('StockBadge component', () => {
  it('renders In Stock badge with remaining count by default (format="left")', () => {
    render(<StockBadge stockQuantity={8} />);
    expect(screen.getByText(/In Stock \(8 left\)/i)).toBeInTheDocument();
    expect(screen.queryByTestId('stock-check-icon')).not.toBeInTheDocument();
  });

  it('renders "X in stock" with icon when format="inStock" and showIcon is true', () => {
    render(<StockBadge stockQuantity={5} format="inStock" showIcon={true} />);
    expect(screen.getByText(/5 in stock/i)).toBeInTheDocument();
    expect(screen.getByTestId('stock-check-icon')).toBeInTheDocument();
  });

  it('renders Out of Stock badge when stock is 0', () => {
    render(<StockBadge stockQuantity={0} />);
    expect(screen.getByText(/Out of Stock/i)).toBeInTheDocument();
  });

  it('renders Out of Stock badge when stock is negative', () => {
    render(<StockBadge stockQuantity={-1} />);
    expect(screen.getByText(/Out of Stock/i)).toBeInTheDocument();
  });
});
