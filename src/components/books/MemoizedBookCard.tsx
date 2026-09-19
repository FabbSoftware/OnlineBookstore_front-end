import React from 'react';
import { BookCard, BookCardProps } from './BookCard';

export const MemoizedBookCard: React.FC<BookCardProps> = React.memo(
  BookCard,
  (prevProps, nextProps) => {
    return (
      prevProps.book.id === nextProps.book.id &&
      prevProps.book.stockQuantity === nextProps.book.stockQuantity &&
      prevProps.book.price === nextProps.book.price &&
      prevProps.book.title === nextProps.book.title &&
      prevProps.book.coverImageUrl === nextProps.book.coverImageUrl &&
      prevProps.onAddToCart === nextProps.onAddToCart
    );
  }
);

MemoizedBookCard.displayName = 'MemoizedBookCard';
