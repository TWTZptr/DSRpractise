import { IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
