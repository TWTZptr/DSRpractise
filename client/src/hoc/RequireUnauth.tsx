import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import React from 'react';

interface RequireUnauthProps {
  children: React.ReactNode;
}

export const RequireUnauth = ({ children }: RequireUnauthProps) => {
  const auth = useAuth();

  if (auth && auth.authenticated) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};
