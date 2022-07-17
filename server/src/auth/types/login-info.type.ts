import { User } from '../../users/users.model';
import { TokenPair } from './token-pair.type';

export type LoginInfo = {
  tokenPair: TokenPair;
  user: User;
};
