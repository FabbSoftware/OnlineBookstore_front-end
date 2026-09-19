import React from 'react';

interface BookGridSkeletonProps {
  count?: number;
}

export const BookGridSkeleton: React.FC<BookGridSkeletonProps> = ({ count = 8 }) => {
  return (
    <div data-testid="book-grid-skeleton" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse flex flex-col"
        >
          <div className="w-full h-56 bg-gray-200" />
          <div className="p-4 flex-1 flex flex-col gap-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="mt-auto pt-3 flex items-center justify-between">
              <div className="h-5 bg-gray-200 rounded w-1/3" />
              <div className="h-8 bg-gray-200 rounded w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
