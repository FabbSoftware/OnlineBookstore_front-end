import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartItemRow } from './CartItemRow';
import { CartItem } from '@/types';

const mockItem: CartItem = {
  id: 'cart-item-1',
  bookId: 'book-101',
  bookTitle: 'Working Effectively with Legacy Code',
  bookAuthor: 'Michael Feathers',
  bookPrice: 42.0,
  bookCoverImageUrl: 'https://example.com/legacy.jpg',
  quantity: 2,
  subtotal: 84.0,
};

describe('CartItemRow component', () => {
  it('renders book details, unit price, quantity, and subtotal', () => {
    render(
      <CartItemRow
        item={mockItem}
        onUpdateQuantity={vi.fn()}
        onRemove={vi.fn()}
      />
    );

    expect(screen.getByText('Working Effectively with Legacy Code')).toBeInTheDocument();
    expect(screen.getByText('Michael Feathers')).toBeInTheDocument();
    expect(screen.getByText('$42.00')).toBeInTheDocument();
    expect(screen.getByTestId('quantity-display')).toHaveTextContent('2');
    expect(screen.getByText('$84.00')).toBeInTheDocument();
  });

  it('calls onUpdateQuantity when quantity is incremented or decremented', () => {
    const handleUpdateQuantity = vi.fn();
    render(
      <CartItemRow
        item={mockItem}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={vi.fn()}
      />
    );

    const incBtn = screen.getByRole('button', { name: /Increase quantity/i });
    fireEvent.click(incBtn);
    expect(handleUpdateQuantity).toHaveBeenCalledWith('cart-item-1', 3);

    const decBtn = screen.getByRole('button', { name: /Decrease quantity/i });
    fireEvent.click(decBtn);
    expect(handleUpdateQuantity).toHaveBeenCalledWith('cart-item-1', 1);
  });

  it('calls onRemove when remove button is clicked', () => {
    const handleRemove = vi.fn();
    render(
      <CartItemRow
        item={mockItem}
        onUpdateQuantity={vi.fn()}
        onRemove={handleRemove}
      />
    );

    const removeBtn = screen.getByRole('button', { name: /Remove item/i });
    fireEvent.click(removeBtn);
    expect(handleRemove).toHaveBeenCalledWith('cart-item-1');
  });
});
