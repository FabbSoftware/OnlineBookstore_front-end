import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BookDetailCard } from './BookDetailCard';
import { Book } from '@/types';

const mockBook: Book = {
  id: 'book-456',
  title: 'Clean Architecture',
  author: 'Robert C. Martin',
  price: 39.99,
  isbn: '978-0134494166',
  description: 'A Craftsman Guide to Software Structure and Design',
  coverImageUrl: 'https://example.com/clean-arch.jpg',
  stockQuantity: 5,
};

describe('BookDetailCard component', () => {
  it('renders book details, price, isbn, description, and stock', () => {
    render(<BookDetailCard book={mockBook} />);

    expect(screen.getByRole('heading', { name: /Clean Architecture/i })).toBeInTheDocument();
    expect(screen.getByText(/Robert C\. Martin/i)).toBeInTheDocument();
    expect(screen.getByText('$39.99')).toBeInTheDocument();
    expect(screen.getByText(/978-0134494166/i)).toBeInTheDocument();
    expect(screen.getByText(/A Craftsman Guide to Software Structure and Design/i)).toBeInTheDocument();
    expect(screen.getByText(/5 in stock/i)).toBeInTheDocument();
  });

  it('increments and decrements quantity within stock limits', () => {
    render(<BookDetailCard book={mockBook} />);

    const incrementBtn = screen.getByRole('button', { name: /Increase quantity/i });
    const decrementBtn = screen.getByRole('button', { name: /Decrease quantity/i });
    const quantityDisplay = screen.getByTestId('quantity-display');

    expect(quantityDisplay).toHaveTextContent('1');

    fireEvent.click(incrementBtn);
    expect(quantityDisplay).toHaveTextContent('2');

    fireEvent.click(decrementBtn);
    expect(quantityDisplay).toHaveTextContent('1');

    // Does not decrement below 1
    fireEvent.click(decrementBtn);
    expect(quantityDisplay).toHaveTextContent('1');
  });

  it('does not increment quantity beyond available stock and disables increment button at limit', () => {
    render(<BookDetailCard book={mockBook} />);

    const incrementBtn = screen.getByRole('button', { name: /Increase quantity/i });
    const quantityDisplay = screen.getByTestId('quantity-display');

    // Click to reach max stock (5)
    for (let i = 0; i < 4; i++) {
      fireEvent.click(incrementBtn);
    }
    expect(quantityDisplay).toHaveTextContent('5');
    expect(incrementBtn).toBeDisabled();

    // Trying to click disabled button shouldn't exceed 5
    fireEvent.click(incrementBtn);
    expect(quantityDisplay).toHaveTextContent('5');
  });

  it('renders out of stock state and disables Add to Cart button when stock is 0', () => {
    const outOfStockBook: Book = { ...mockBook, stockQuantity: 0 };
    render(<BookDetailCard book={outOfStockBook} />);

    expect(screen.getByText(/Out of Stock/i)).toBeInTheDocument();
    const addBtn = screen.getByRole('button', { name: /Add to Cart/i });
    expect(addBtn).toBeDisabled();
  });

  it('calls onAddToCart with book and selected quantity', () => {
    const handleAddToCart = vi.fn();
    render(<BookDetailCard book={mockBook} onAddToCart={handleAddToCart} />);

    const incrementBtn = screen.getByRole('button', { name: /Increase quantity/i });
    fireEvent.click(incrementBtn); // quantity = 2

    const addBtn = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addBtn);

    expect(handleAddToCart).toHaveBeenCalledWith(mockBook, 2);
  });
});
