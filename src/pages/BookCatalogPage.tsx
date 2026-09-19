import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, X } from 'lucide-react';
import { useBooksQuery } from '@/api/book';
import { useAddToCartMutation } from '@/api/cart';
import { useAuthStore, useSearchStore, useToastStore } from '@/store';
import { BookGrid } from '@/components/books';
import { BookGridSkeleton } from '@/components/common/skeletons';
import { Book } from '@/types';

export const BookCatalogPage: React.FC = () => {
  const { searchQuery, clearSearchQuery } = useSearchStore();
  const { addToast } = useToastStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const addToCartMutation = useAddToCartMutation();
  const { data: books, isLoading, isError, error } = useBooksQuery(searchQuery);

  const handleAddToCart = useCallback(
    (book: Book) => {
      if (!isAuthenticated) {
        addToast('Please sign in to add items to your cart.', 'info');
        navigate('/login', { state: { from: location } });
        return;
      }
      addToCartMutation.mutate(
        { bookId: book.id, quantity: 1 },
        {
          onSuccess: () => {
            addToast(`Added "${book.title}" to cart!`, 'success');
          },
          onError: (err) => {
            addToast(err.message || 'Failed to add item to cart', 'error');
          },
        }
      );
    },
    [isAuthenticated, addToCartMutation, addToast, navigate, location]
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white p-8 md:p-12 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-medium backdrop-blur-sm mb-4 border border-indigo-400/20">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Software Engineering & Fiction
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Explore Our Book Collection
          </h1>
          <p className="mt-4 text-base sm:text-lg text-indigo-200 font-normal leading-relaxed">
            Discover bestsellers, programming classics, software architecture guides, and timeless literature.
          </p>
        </div>
      </div>

      {/* Active Search Filter Banner */}
      {searchQuery && (
        <div className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-900 text-sm">
          <span className="font-medium">
            Showing results for "{searchQuery}"
          </span>
          <button
            type="button"
            onClick={clearSearchQuery}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 bg-white hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Clear filter
          </button>
        </div>
      )}

      {/* Books Content */}
      {isLoading ? (
        <BookGridSkeleton count={8} />
      ) : isError ? (
        <div className="text-center py-12 bg-white rounded-xl border border-red-100 p-6">
          <p className="text-red-600 font-medium">
            {error instanceof Error ? error.message : 'Failed to load books. Please try again later.'}
          </p>
        </div>
      ) : (
        <BookGrid books={books || []} onAddToCart={handleAddToCart} />
      )}
    </div>
  );
};
