import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './ jwt-auth.guard';
import { AuthorizedUser } from '../users/authorized-user.decorator';
import { UserPayload } from '../users/user-payload.type';

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
    const { tokenPair, user } = await this.authService.login(userLoginDto);
    response.cookie('refreshToken', tokenPair.refreshToken, {
      maxAge: this.configService.get<number>('REFRESH_TOKEN_EXPIRATION_TIME'),
      expires: new Date(
        Date.now() +
          this.configService.get<number>('REFRESH_TOKEN_EXPIRATION_TIME'),
      ),
    });
    return { accessToken: tokenPair.accessToken, user };
  }

  @Post('/refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refreshToken'];
    const tokenPair = this.authService.refreshTokenPair(refreshToken);
    response.cookie('refreshToken', tokenPair.refreshToken, {
      maxAge: this.configService.get<number>('REFRESH_TOKEN_EXPIRATION_TIME'),
      expires: new Date(
        Date.now() +
          this.configService.get<number>('REFRESH_TOKEN_EXPIRATION_TIME'),
      ),
    });
    return { accessToken: tokenPair.accessToken };
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getSelf(@AuthorizedUser() user: UserPayload) {
    return this.authService.getSelf(user.id);
  }
}
