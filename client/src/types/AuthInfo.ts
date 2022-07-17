import { User } from './User';

export type AuthInfo = {
  user: User | null;
  signIn: Function;
};
