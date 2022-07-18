import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
} from 'class-validator';
import {
  MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_USER_PHONE_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USER_PHONE_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../constants';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH)
  login: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)
  password: string;

  @IsNotEmpty()
  @Length(MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH)
  name: string;

  @IsNotEmpty()
  @Length(MIN_USER_PHONE_LENGTH, MAX_USER_PHONE_LENGTH)
  phone: string;
}
