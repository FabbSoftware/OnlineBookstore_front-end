import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar';
import { ToastContainer } from './ToastContainer';
import { BookGridSkeleton } from './skeletons';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Suspense fallback={<BookGridSkeleton />}>
          <Outlet />
        </Suspense>
      </main>
      <ToastContainer />
    </div>
  );
};
