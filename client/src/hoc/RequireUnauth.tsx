import { useAuth } from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';

interface RequireUnauthProps {
  children: React.ReactNode;
}

export const RequireUnauth = ({ children }: RequireUnauthProps) => {
  const auth = useAuth();
  const location = useLocation();
  const fromPage = (location.state as any)?.from?.pathname || '/profile';

  if (auth && auth.authenticated) {
    return <Navigate to={fromPage} replace />;
  }

  return <>{children}</>;
};
