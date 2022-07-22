import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import React from 'react';

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth && !auth.authenticated) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return <>{children}</>;
};
