import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export const BrandLogo: React.FC = () => {
  return (
    <Link
      to="/"
      aria-label="BookStore"
      className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
    >
      <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-sm group-hover:bg-indigo-700 transition-colors">
        <BookOpen className="w-5 h-5" />
      </div>
      <span className="text-xl font-bold text-gray-900 tracking-tight">
        Book<span className="text-indigo-600">Store</span>
      </span>
    </Link>
  );
};
