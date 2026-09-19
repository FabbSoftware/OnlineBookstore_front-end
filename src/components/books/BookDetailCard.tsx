import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Book } from '@/types';
import { BookCover } from './BookCover';
import { StockBadge } from './StockBadge';
import { BookInfo } from './BookInfo';

export interface BookDetailCardProps {
  book: Book;
  onAddToCart?: (book: Book, quantity: number) => void;
}

export const BookDetailCard: React.FC<BookDetailCardProps> = ({ book, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = book.stockQuantity <= 0;
  const isAtMaxStock = quantity >= book.stockQuantity;

  const handleIncrement = () => {
    if (quantity < book.stockQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart?.(book, quantity);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Cover Column */}
        <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-6 sm:p-8 border border-gray-100">
          <BookCover
            coverImageUrl={book.coverImageUrl}
            title={book.title}
            className="max-h-96"
          />
        </div>

        {/* Info Column */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <StockBadge stockQuantity={book.stockQuantity} format="inStock" showIcon />
              {book.isbn && (
                <span className="text-xs text-gray-400 font-mono">
                  ISBN: {book.isbn}
                </span>
              )}
            </div>

            <BookInfo
              title={book.title}
              author={book.author}
              size="lg"
              authorPrefix="By "
              description={book.description}
            />

            <div className="text-3xl font-black text-gray-900 pt-2">
              ${book.price.toFixed(2)}
            </div>
          </div>

          {/* Actions: Quantity & Add to Cart */}
          <div className="pt-6 border-t border-gray-100 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Quantity</span>
              <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={isOutOfStock || quantity <= 1}
                  aria-label="Decrease quantity"
                  className="p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span
                  data-testid="quantity-display"
                  className="px-4 py-1 text-sm font-semibold text-gray-900 min-w-[2.5rem] text-center"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={isOutOfStock || isAtMaxStock}
                  aria-label="Increase quantity"
                  className="p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
