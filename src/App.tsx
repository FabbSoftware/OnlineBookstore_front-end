import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { createBookstoreRouter } from './routes/router';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

let browserRouter: ReturnType<typeof createBookstoreRouter> | null = null;
export const getAppRouter = (qc: QueryClient = queryClient) => {
  if (!browserRouter) {
    browserRouter = createBookstoreRouter(qc);
  }
  return browserRouter;
};

export interface AppProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router?: any;
  queryClient?: QueryClient;
}

export const App: React.FC<AppProps> = ({ router, queryClient: qc = queryClient }) => {
  const activeRouter = router || getAppRouter(qc);
  return (
    <QueryClientProvider client={qc}>
      <RouterProvider router={activeRouter} />
    </QueryClientProvider>
  );
};

export default App;
