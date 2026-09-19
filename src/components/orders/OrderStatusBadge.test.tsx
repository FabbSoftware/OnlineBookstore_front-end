import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OrderStatusBadge } from './OrderStatusBadge';

describe('OrderStatusBadge component', () => {
  it('renders PENDING status badge', () => {
    render(<OrderStatusBadge status="PENDING" />);
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  });

  it('renders CONFIRMED status badge', () => {
    render(<OrderStatusBadge status="CONFIRMED" />);
    expect(screen.getByText(/Confirmed/i)).toBeInTheDocument();
  });

  it('renders SHIPPED status badge', () => {
    render(<OrderStatusBadge status="SHIPPED" />);
    expect(screen.getByText(/Shipped/i)).toBeInTheDocument();
  });

  it('renders DELIVERED status badge', () => {
    render(<OrderStatusBadge status="DELIVERED" />);
    expect(screen.getByText(/Delivered/i)).toBeInTheDocument();
  });

  it('renders CANCELLED status badge', () => {
    render(<OrderStatusBadge status="CANCELLED" />);
    expect(screen.getByText(/Cancelled/i)).toBeInTheDocument();
  });
});
