import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BookCard } from './BookCard';
import { Book } from '@/types';

const mockBook: Book = {
  id: 'book-123',
  title: 'Test Driven Development',
  author: 'Kent Beck',
  price: 34.5,
  description: 'By Example',
  coverImageUrl: 'https://example.com/tdd.jpg',
  stockQuantity: 8,
};

describe('BookCard component', () => {
  it('renders book information and link to details', () => {
    render(
      <MemoryRouter>
        <BookCard book={mockBook} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Test Driven Development/i })).toBeInTheDocument();
    expect(screen.getByText(/Kent Beck/i)).toBeInTheDocument();
    expect(screen.getByText('$34.50')).toBeInTheDocument();
    expect(screen.getByText(/In Stock \(8 left\)/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View Details/i })).toHaveAttribute('href', '/books/book-123');
  });

  it('renders out of stock badge and disabled Add to Cart button when stock is 0', () => {
    const outOfStockBook: Book = { ...mockBook, stockQuantity: 0 };
    render(
      <MemoryRouter>
        <BookCard book={outOfStockBook} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Out of Stock/i)).toBeInTheDocument();
    const addBtn = screen.getByRole('button', { name: /Add to Cart/i });
    expect(addBtn).toBeDisabled();
  });

  it('calls onAddToCart callback when Add to Cart button is clicked', () => {
    const handleAddToCart = vi.fn();
    render(
      <MemoryRouter>
        <BookCard book={mockBook} onAddToCart={handleAddToCart} />
      </MemoryRouter>
    );

    const addBtn = screen.getByRole('button', { name: /Add to Cart/i });
    expect(addBtn).not.toBeDisabled();
    fireEvent.click(addBtn);

    expect(handleAddToCart).toHaveBeenCalledWith(mockBook);
  });
});
