import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BookGrid } from './BookGrid';
import { Book } from '@/types';

describe('BookGrid component', () => {
  const books: Book[] = [
    {
      id: 'book-1',
      title: 'Design Patterns',
      author: 'GoF',
      price: 45.0,
      stockQuantity: 10,
    },
    {
      id: 'book-2',
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      price: 35.0,
      stockQuantity: 5,
    },
  ];

  it('renders list of books in a grid', () => {
    render(
      <MemoryRouter>
        <BookGrid books={books} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Design Patterns/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Clean Architecture/i })).toBeInTheDocument();
  });

  it('renders empty message when no books are found', () => {
    render(
      <MemoryRouter>
        <BookGrid books={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText(/No books found/i)).toBeInTheDocument();
  });
});
