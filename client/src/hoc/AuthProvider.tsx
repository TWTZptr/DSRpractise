import React from 'react';
import { User } from '../types/User';
import { AuthInfo } from '../types/AuthInfo';
import {
  getSelf,
  getAccessTokenFromStorage,
  tryLogin,
  tryRefresh,
} from '../services/authService';
import { LoginData } from '../types/LoginData';
import { Response } from '../types/Response';
import { UserRegistrationData } from '../types/UserRegistrationData';

interface AuthProviderProps {
  children: React.ReactNode;
}

const INIT_USER: User = {
  login: '',
  phone: '',
  email: '',
  name: '',
  banned: false,
  id: 0,
  role: {
    id: 0,
    name: '',
  },
  roleId: 0,
};

export const AuthContext = React.createContext<AuthInfo | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuthProvider = () => {
  const [user, setUser] = React.useState<User>(INIT_USER);

  const [authenticated, setAuthenticated] = React.useState(false);

  const loginUser = (user: User) => {
    setUser(user);
    setAuthenticated(true);
  };

  const logoutUser = () => {
    setUser(INIT_USER);
    setAuthenticated(false);
  };

  const login = async (data: LoginData): Promise<Response> => {
    try {
      const response = await tryLogin(data.login, data.password);
      if (response.ok) {
        loginUser(response.data);
      }

      return response;
    } catch (err) {
      throw err;
    }
  };

  const register = React.useCallback(
    async (data: UserRegistrationData): Promise<Response> => {
      try {
        const response = await register(data);
        if (response.ok) {
          loginUser(response.data);
        }

        return response;
      } catch (err) {
        throw err;
      }
    },
    [],
  );

  const refresh = React.useCallback(async (): Promise<boolean> => {
    try {
      const refreshed = await tryRefresh();
      if (!refreshed) {
        logoutUser();
        return false;
      }
      return true;
    } catch (err) {
      throw err;
    }
  }, []);

  React.useEffect(() => {
    const fetchAuth = async () => {
      let tokenReady = getAccessTokenFromStorage();

      if (tokenReady) {
        const response = await getSelf();
        if (response.ok) {
          loginUser(response.data);
        } else {
          tokenReady = false;
        }
      }

      if (!tokenReady) {
        await refresh();
      }
    };

    fetchAuth();
  }, [refresh]);

  return {
    user,
    login,
    register,
    authenticated,
    refresh,
  };
};
