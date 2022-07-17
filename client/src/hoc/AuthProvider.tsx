import React from 'react';
import { User } from '../types/User';
import { AuthInfo } from '../types/AuthInfo';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<AuthInfo | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);

  const signIn = (user: User, callback: Function) => {
    setUser(user);
    callback();
  };

  const value = { user, signIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
