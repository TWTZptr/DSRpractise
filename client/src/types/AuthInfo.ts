import { User } from './User';
import { LoginData } from './LoginData';
import { UserRegistrationData } from './UserRegistrationData';
import { Response } from './Response';

export type AuthInfo = {
  user: User;
  login: (data: LoginData) => Promise<Response>;
  register: (data: UserRegistrationData) => Promise<Response>;
  authenticated: boolean;
  refresh: () => Promise<boolean>;
  logout: () => Promise<void>;
};
