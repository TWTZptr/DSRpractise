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
import { UserPayload } from '../users/user-payload.type';
import { BANNED_USER_MSG } from './constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    let userPayload: UserPayload;

    try {
      userPayload = this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException();
    }

    if (userPayload.banned) {
      throw new UnauthorizedException(BANNED_USER_MSG);
    }

    req.user = userPayload;
    return requiredRoles.includes(userPayload.role);
  }
}
