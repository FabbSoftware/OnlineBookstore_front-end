import React from 'react';
import { BookOpen } from 'lucide-react';
import { MemoizedBookCard } from './MemoizedBookCard';
import { EmptyState } from '@/components/common';
import { Book } from '@/types';

interface BookGridProps {
  books: Book[];
  onAddToCart?: (book: Book) => void;
}

export const BookGrid: React.FC<BookGridProps> = ({ books, onAddToCart }) => {
  if (books.length === 0) {
    return (
      <EmptyState
        title="No books found"
        description="We couldn't find any books matching your criteria. Try adjusting your search query."
        icon={<BookOpen className="w-8 h-8" />}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <MemoizedBookCard key={book.id} book={book} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};
