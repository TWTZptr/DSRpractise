import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from '../auth/role-guard.service';
import { RequireRole } from '../auth/role-auth.decorator';
import { JwtAuthGuard } from '../auth/ jwt-auth.guard';
import { AuthorizedUser } from './authorized-user.decorator';
import { UserPayload } from './user-payload.type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createClient(createUserDto);
    user.password = undefined;
    return user;
  }

  @Get()
  @UseGuards(RoleGuard)
  @RequireRole('Admin')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @RequireRole('Admin')
  findById(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @RequireRole('Admin')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Post(':id/ban')
  @UseGuards(RoleGuard)
  @RequireRole('Admin')
  banUser(@Param('id') id: string) {
    return this.usersService.banById(+id);
  }

  @Post(':id/unban')
  @UseGuards(RoleGuard)
  @RequireRole('Admin')
  unbanUser(@Param('id') id: string) {
    return this.usersService.unbanById(+id);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @RequireRole('Admin')
  remove(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }
}
