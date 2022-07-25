import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesModule } from '../roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { PasswordModule } from '../password/password.module';
import { PetsModule } from '../pets/pets.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User]),
    RolesModule,
    JwtModule,
    AuthModule,
    PasswordModule,
    forwardRef(() => PetsModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
