import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OrderItemRow } from './OrderItemRow';
import { OrderItem } from '@/types';

const mockOrderItem: OrderItem = {
  id: 'order-item-1',
  bookId: 'b-1',
  bookTitle: 'Design Patterns',
  bookAuthor: 'Gang of Four',
  price: 50.0,
  quantity: 2,
  subtotal: 100.0,
  bookCoverImageUrl: 'https://example.com/gof.jpg',
};

describe('OrderItemRow component', () => {
  it('renders order item information, quantity, price, and subtotal', () => {
    render(<OrderItemRow item={mockOrderItem} />);

    expect(screen.getByText('Design Patterns')).toBeInTheDocument();
    expect(screen.getByText('Gang of Four')).toBeInTheDocument();
    expect(screen.getByText(/Qty: 2/i)).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });
});
