import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import {
  NotFoundPage,
  UnauthorizedPage,
  ServerErrorPage,
  GeneralErrorPage,
} from '@/pages/errors';

export const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFoundPage message={error.data as string} />;
    }
    if (error.status === 401 || error.status === 403) {
      return <UnauthorizedPage statusCode={error.status as 401 | 403} message={error.data as string} />;
    }
    if (error.status >= 500) {
      return <ServerErrorPage message={error.data as string} />;
    }
    return (
      <GeneralErrorPage
        statusCode={error.status}
        title={error.statusText}
        message={(error.data as string) || undefined}
      />
    );
  }

  if (error instanceof Error) {
    return <GeneralErrorPage message={error.message} />;
  }

  return <GeneralErrorPage />;
};
