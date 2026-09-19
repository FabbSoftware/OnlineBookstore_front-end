import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { RootLayout, RouteErrorBoundary, ProtectedRoute, BookGridSkeleton } from '@/components/common';
import {
  BookCatalogPage,
  BookDetailPage,
  CartPage,
  CheckoutPage,
  OrderHistoryPage,
  LoginPage,
  RegisterPage,
  NotFoundPage,
} from '@/pages';
import { catalogLoader, bookDetailLoader, cartLoader, ordersLoader } from '@/loaders';

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

