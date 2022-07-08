import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/login')
  async login(
    @Body() userLoginDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokenPair = await this.authService.login(userLoginDto);
    response.cookie('refreshToken', tokenPair.refreshToken, {
      httpOnly: true,
      maxAge: this.configService.get<number>('REFRESH_TOKEN_EXPIRATION_TIME'),
    });
    return { accessToken: tokenPair.accessToken };
  }

  @Post('/refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refreshToken'];
    const tokenPair = this.authService.refreshTokenPair(refreshToken);
    response.cookie('refreshToken', tokenPair.refreshToken);
    return { accessToken: tokenPair.accessToken };
  }
}
