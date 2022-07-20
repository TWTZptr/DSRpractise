import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import React from 'react';

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const auth = useAuth();

  if (auth && !auth.authenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
