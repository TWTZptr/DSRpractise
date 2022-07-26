import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UserPayload } from '../users/user-payload.type';

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
      throw new ForbiddenException();
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new ForbiddenException();
    }

    try {
      const { role, id }: UserPayload = this.jwtService.verify(token);
      req.user = { role, id };
      return requiredRoles.includes(req.user.role);
    } catch (err) {
      throw new ForbiddenException();
    }
  }
}
