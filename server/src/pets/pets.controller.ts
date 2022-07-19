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
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { RoleGuard } from '../auth/role-guard.service';
import { RequireRole } from '../auth/role-auth.decorator';
import { JwtAuthGuard } from '../auth/ jwt-auth.guard';
import { AuthorizedUser } from '../users/authorized-user.decorator';
import { UserPayload } from '../users/user-payload.type';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @UseGuards(RoleGuard)
  @RequireRole('Client')
  create(
    @Body() createPetDto: CreatePetDto,
    @AuthorizedUser() user: UserPayload,
  ) {
    return this.petsService.create(createPetDto, user.id);
  }

  @Get()
  @UseGuards(RoleGuard)
  @RequireRole('Admin')
  findAll() {
    return this.petsService.findAll();
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @RequireRole('Admin')
  findOne(@Param('id') id: string) {
    return this.petsService.findById(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(+id, updatePetDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.petsService.deleteById(+id);
  }

  @Get('/my/all')
  @UseGuards(JwtAuthGuard)
  getUserPets(@AuthorizedUser() user: UserPayload) {
    return this.petsService.findByOwnerId(user.id);
  }
}
