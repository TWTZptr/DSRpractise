import {
  Body,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginInfo } from './types/login-info.type';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto/login-user.dto';
import { INVALID_CREDENTIALS_MSG } from './constants';
import { PasswordService } from '../password/password.service';
import { TokenPair } from './types/token-pair.type';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly passwordService: PasswordService,
  ) {}

  async login(@Body() userLoginDto: LoginUserDto): Promise<LoginInfo> {
    const user = await this.usersService.findByLogin(userLoginDto.login);
    if (
      !user ||
      !(await this.passwordService.compare(
        userLoginDto.password,
        user.password,
      ))
    ) {
      throw new UnauthorizedException(INVALID_CREDENTIALS_MSG);
    }

    const userRole = await user.$get('role');
    const payload = { role: userRole.name, id: user.id, banned: user.banned };
    const tokenPair = this.generateTokenPair(payload);
    user.password = undefined;
    return { tokenPair, user };
  }

  private generateTokenPair(payload): TokenPair {
    return {
      accessToken: `Bearer ${this.jwtService.sign(payload)}`,
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>(
          'REFRESH_TOKEN_EXPIRATION_TIME',
        ),
      }),
    };
  }

  refreshTokenPair(refreshToken: string): TokenPair {
    try {
      const { exp, iat, ...payload } = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
      return this.generateTokenPair(payload);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  async getSelf(id: number): Promise<User> {
    const user = await this.usersService.findById(id, { include: 'role' });
    user.password = undefined;
    return user;
  }
}
