import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, LogIn, Home } from 'lucide-react';

interface UnauthorizedPageProps {
  statusCode?: 401 | 403;
  message?: string;
}

export const UnauthorizedPage: React.FC<UnauthorizedPageProps> = ({
  statusCode = 401,
  message,
}) => {
  const is403 = statusCode === 403;
  const title = is403 ? '403 - Forbidden' : '401 - Access Denied';
  const defaultMessage = is403
    ? 'You do not have permission to access this resource.'
    : 'You need to be signed in to view this page.';

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{message || defaultMessage}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium text-sm shadow-sm transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
