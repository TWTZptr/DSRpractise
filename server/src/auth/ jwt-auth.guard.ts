import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { BANNED_USER_MSG } from './constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      req.user = this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException();
    }

    if (req.user.banned) {
      throw new UnauthorizedException(BANNED_USER_MSG);
    }

    return true;
  }
}
