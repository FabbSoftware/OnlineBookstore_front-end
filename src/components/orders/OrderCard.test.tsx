import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OrderCard } from './OrderCard';
import { Order } from '@/types';

const mockOrder: Order = {
  id: 'order-12345',
  status: 'CONFIRMED',
  createdAt: '2026-09-18T12:00:00Z',
  shippingAddress: '742 Evergreen Terrace, Springfield',
  contactPhone: '+1-555-123-4567',
  totalAmount: 79.99,
  items: [
    {
      id: 'item-1',
      bookId: 'b-1',
      bookTitle: 'Clean Architecture',
      bookAuthor: 'Robert C. Martin',
      price: 39.99,
      quantity: 2,
      subtotal: 79.98,
    },
  ],
};

describe('OrderCard component', () => {
  it('renders order id, status badge, shipping address, and total amount', () => {
    render(<OrderCard order={mockOrder} />);

    expect(screen.getByText(/Order #order-12345/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirmed/i)).toBeInTheDocument();
    expect(screen.getByText(/742 Evergreen Terrace, Springfield/i)).toBeInTheDocument();
    expect(screen.getByText(/\+1-555-123-4567/i)).toBeInTheDocument();
    expect(screen.getByText('$79.99')).toBeInTheDocument();
    expect(screen.getByText('Clean Architecture')).toBeInTheDocument();
  });
});
