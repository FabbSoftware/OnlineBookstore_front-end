import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Book } from '@/types';
import { BookCover } from './BookCover';
import { StockBadge } from './StockBadge';
import { BookInfo } from './BookInfo';

interface BookCardProps {
  book: Book;
  onAddToCart?: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart }) => {
  const isOutOfStock = book.stockQuantity <= 0;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col overflow-hidden group">
      {/* Book Cover */}
      <div className="h-52 bg-slate-100 relative overflow-hidden flex items-center justify-center p-4">
        <BookCover
          coverImageUrl={book.coverImageUrl}
          title={book.title}
          className="h-full group-hover:scale-105"
        />

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          <StockBadge stockQuantity={book.stockQuantity} />
        </div>
      </div>

      {/* Book Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <BookInfo
          title={book.title}
          author={book.author}
          description={book.description}
        />

        <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block font-normal">Price</span>
            <span className="text-xl font-bold text-gray-900">
              ${book.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/books/${book.id}`}
              className="px-3 py-2 text-xs font-medium text-gray-700 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              View Details
            </Link>
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={() => onAddToCart?.(book)}
              aria-label="Add to Cart"
              title={`Add ${book.title} to Cart`}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white rounded-lg transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="sr-only">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
