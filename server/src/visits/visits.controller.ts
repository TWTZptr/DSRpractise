import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { PetsService } from '../pets/pets.service';
import { UNEXIST_PET_ID_MSG } from '../pets/constants';
import { RoleGuard } from '../auth/role-guard.service';
import { RequireRole } from '../auth/role-auth.decorator';
import { JwtAuthGuard } from '../auth/ jwt-auth.guard';
import { AuthorizedUser } from '../users/authorized-user.decorator';
import { UserPayload } from '../users/user-payload.type';

@Controller('visits')
export class VisitsController {
  constructor(
    private readonly visitsService: VisitsService,
    private readonly petsService: PetsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createVisitDto: CreateVisitDto) {
    const pet = this.petsService.findById(createVisitDto.petId);

    if (!pet) {
      throw new NotFoundException(UNEXIST_PET_ID_MSG);
    }

    return this.visitsService.create(createVisitDto);
  }

  @UseGuards(RoleGuard)
  @RequireRole('Admin')
  @Get()
  findAll() {
    return this.visitsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitDto: UpdateVisitDto) {
    return this.visitsService.update(+id, updateVisitDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @AuthorizedUser() user: UserPayload) {
    return this.visitsService.remove(+id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  getVisitsByUserId(@AuthorizedUser() user: UserPayload) {}
}
