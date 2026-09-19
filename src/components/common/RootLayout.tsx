import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar';
import { ToastContainer } from './ToastContainer';
import { BookGridSkeleton } from './skeletons';
import { useAuthStore } from '@/store';
import { useCartQuery } from '@/api/cart';

export const RootLayout: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { data: cart } = useCartQuery({ enabled: isAuthenticated });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased">
      <Navbar cartItemCount={cart?.totalItems ?? 0} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Suspense fallback={<BookGridSkeleton />}>
          <Outlet />
        </Suspense>
      </main>
      <ToastContainer />
    </div>
  );
};
