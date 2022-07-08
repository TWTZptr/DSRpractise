import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.getAllAndOverride('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new ForbiddenException();
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
        throw new ForbiddenException();
      }

      req.user = this.jwtService.verify(token);
      return req.user.role === requiredRole;
    } catch (err) {
      console.log(err);
      throw new ForbiddenException();
    }
  }
}
