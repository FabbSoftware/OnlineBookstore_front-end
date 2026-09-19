import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { RootLayout } from '@/components/common/RootLayout';
import { RouteErrorBoundary } from '@/components/common/RouteErrorBoundary';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { BookCatalogPage } from '@/pages/BookCatalogPage';
import { BookDetailPage } from '@/pages/BookDetailPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { OrderHistoryPage } from '@/pages/OrderHistoryPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { NotFoundPage } from '@/pages/errors/NotFoundPage';
import { catalogLoader, bookDetailLoader } from '@/loaders/bookLoaders';
import { cartLoader } from '@/loaders/cartLoader';
import { ordersLoader } from '@/loaders/orderLoaders';
import { BookGridSkeleton } from '@/components/common/skeletons/BookGridSkeleton';

export const getRoutes = (queryClient: QueryClient): RouteObject[] => [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    hydrateFallbackElement: <BookGridSkeleton />,
    children: [
      {
        index: true,
        loader: catalogLoader(queryClient),
        element: <BookCatalogPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: 'books/:id',
        loader: bookDetailLoader(queryClient),
        element: <BookDetailPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: 'cart',
        loader: cartLoader(queryClient),
        element: <CartPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'checkout',
            element: <CheckoutPage />,
          },
          {
            path: 'orders',
            loader: ordersLoader(queryClient),
            element: <OrderHistoryPage />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export const createBookstoreRouter = (queryClient: QueryClient) => {
  return createBrowserRouter(getRoutes(queryClient));
};

