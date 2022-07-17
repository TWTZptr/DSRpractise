import { User } from '../../users/users.model';
import { TokenPairType } from './token-pair.type';

export type LoginInfo = {
  tokenPair: TokenPairType;
  user: User;
};
