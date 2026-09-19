import React from 'react';

export const BookDetailSkeleton: React.FC = () => {
  return (
    <div data-testid="book-detail-skeleton" className="max-w-5xl mx-auto px-4 py-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="h-96 bg-gray-200 rounded-xl w-full" />
        <div className="flex flex-col gap-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-5 bg-gray-200 rounded w-1/3" />
          <div className="h-7 bg-gray-200 rounded w-1/4 my-2" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
          <div className="h-12 bg-gray-200 rounded-lg w-full mt-6" />
        </div>
      </div>
    </div>
  );
};
