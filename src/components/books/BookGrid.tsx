import React from 'react';
import { BookOpen } from 'lucide-react';
import { BookCard } from './BookCard';
import { Book } from '@/types';

interface BookGridProps {
  books: Book[];
  onAddToCart?: (book: Book) => void;
}

export const BookGrid: React.FC<BookGridProps> = ({ books, onAddToCart }) => {
  if (books.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <div className="w-16 h-16 mx-auto mb-4 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500">
          <BookOpen className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No books found</h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          We couldn't find any books matching your criteria. Try adjusting your search query.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};
