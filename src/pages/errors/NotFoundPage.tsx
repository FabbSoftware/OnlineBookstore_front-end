import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';

interface NotFoundPageProps {
  message?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  message = "The page you are looking for doesn't exist or has been moved.",
}) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
          <FileQuestion className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">404</h1>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{message}</p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium text-sm shadow-sm transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};
