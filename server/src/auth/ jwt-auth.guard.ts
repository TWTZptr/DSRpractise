import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { INVALID_CREDENTIALS_MSG } from './constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedException();
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException();
      }

      req.user = this.jwtService.verify(token);
      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
