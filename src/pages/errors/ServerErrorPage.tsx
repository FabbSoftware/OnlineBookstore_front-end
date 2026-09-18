import React from 'react';
import { Link } from 'react-router-dom';
import { ServerCrash, RefreshCw, Home } from 'lucide-react';

interface ServerErrorPageProps {
  message?: string;
}

export const ServerErrorPage: React.FC<ServerErrorPageProps> = ({
  message = 'Something went wrong on our servers. Please try again later.',
}) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
          <ServerCrash className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">500 - Server Error</h1>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{message}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium text-sm shadow-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
