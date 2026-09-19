import React from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useBookDetailQuery } from '@/api/book';
import { useAddToCartMutation } from '@/api/cart';
import { useAuthStore, useToastStore } from '@/store';
import { BookDetailSkeleton } from '@/components/common/skeletons';
import { BookDetailCard } from '@/components/books';
import { Book } from '@/types';

export const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, isError } = useBookDetailQuery(id || '');
  const { addToast } = useToastStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const addToCartMutation = useAddToCartMutation();

  if (isLoading) {
    return <BookDetailSkeleton />;
  }

  if (isError || !book) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h1>
        <p className="text-gray-500 mb-6">
          The book you are looking for might have been removed or does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = (item: Book, quantity: number) => {
    if (!isAuthenticated) {
      addToast('Please sign in to add items to your cart.', 'info');
      navigate('/login', { state: { from: location } });
      return;
    }
    addToCartMutation.mutate(
      { bookId: item.id, quantity },
      {
        onSuccess: () => {
          addToast(`Added ${quantity} × "${item.title}" to cart!`, 'success');
        },
        onError: (err) => {
          addToast(err.message || 'Failed to add item to cart', 'error');
        },
      }
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>
      </div>

      <BookDetailCard book={book} onAddToCart={handleAddToCart} />
    </div>
  );
};
