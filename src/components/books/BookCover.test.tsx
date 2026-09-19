import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BookCover } from './BookCover';

describe('BookCover component', () => {
  it('renders image when coverImageUrl is provided', () => {
    render(<BookCover coverImageUrl="https://example.com/cover.jpg" title="Clean Code" />);
    const img = screen.getByRole('img', { name: 'Clean Code' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/cover.jpg');
  });

  it('renders fallback placeholder icon when coverImageUrl is not provided', () => {
    render(<BookCover title="Clean Architecture" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByTestId('book-cover-placeholder')).toBeInTheDocument();
  });
});
