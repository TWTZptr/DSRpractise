import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/users.model';
import { TokenPair } from './tokenPair.type';
import { ConfigService } from '@nestjs/config';
import { UserLoginDto } from './dto/user-login.dto';
import { INVALID_CREDENTIALS_MSG } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(@Body() userLoginDto: UserLoginDto): Promise<TokenPair> {
    const user = await this.usersService.findByLogin(userLoginDto.login);
    if (!user || user.password !== userLoginDto.password) {
      throw new UnauthorizedException(INVALID_CREDENTIALS_MSG);
    }

    return this.generateTokenPair(user);
  }

  generateTokenPair(user: User): TokenPair {
    const payload = { role: user.role, id: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>(
          'REFRESH_TOKEN_EXPIRATION_TIME',
        ),
      }),
    };
  }
}
