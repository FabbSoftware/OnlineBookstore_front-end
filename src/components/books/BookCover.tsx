import React from 'react';
import { BookOpen } from 'lucide-react';

interface BookCoverProps {
  coverImageUrl?: string;
  title: string;
  className?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({
  coverImageUrl,
  title,
  className = '',
}) => {
  if (coverImageUrl) {
    return (
      <img
        src={coverImageUrl}
        alt={title}
        className={`object-contain drop-shadow-md transition-transform duration-300 ${className}`}
      />
    );
  }

  return (
    <div
      data-testid="book-cover-placeholder"
      className={`bg-indigo-50 rounded border border-indigo-100 flex items-center justify-center text-indigo-400 ${className}`}
    >
      <BookOpen className="w-10 h-10" />
    </div>
  );
};
