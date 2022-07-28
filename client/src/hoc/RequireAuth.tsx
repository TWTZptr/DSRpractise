import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import React from 'react';

interface RequireAuthProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const RequireAuth = ({
  children,
  adminOnly = false,
}: RequireAuthProps) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth && !auth.authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (auth && adminOnly && auth.user.role.name !== 'Admin') {
    return <Navigate to="/profile" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
