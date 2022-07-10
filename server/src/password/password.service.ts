import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { NUMBER_OF_PASSWORD_SALT_ROUNDS } from './constants';

@Injectable()
export class PasswordService {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(NUMBER_OF_PASSWORD_SALT_ROUNDS);
    return bcrypt.hash(password, salt);
  }

  compare(password: string, hash: string): Promise<Boolean> {
    return bcrypt.compare(password, hash);
  }
}
