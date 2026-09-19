import React from 'react';

export interface BookInfoProps {
  title: string;
  author: string;
  description?: string;
  size?: 'sm' | 'lg';
  authorPrefix?: string;
  className?: string;
}

export const BookInfo: React.FC<BookInfoProps> = ({
  title,
  author,
  description,
  size = 'sm',
  authorPrefix = '',
  className = '',
}) => {
  if (size === 'lg') {
    return (
      <div className={`space-y-4 ${className}`}>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="text-base text-gray-600 font-medium mt-1">
            {authorPrefix}{author}
          </p>
        </div>

        {description && (
          <div className="pt-4 border-t border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <h3 className="font-semibold text-gray-900 text-lg line-clamp-1 group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mt-1 font-medium">
        {authorPrefix}{author}
      </p>
      {description && (
        <p className="text-xs text-gray-400 mt-2 line-clamp-2">{description}</p>
      )}
    </div>
  );
};
