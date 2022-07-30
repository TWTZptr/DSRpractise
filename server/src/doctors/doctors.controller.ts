import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { RequireRole } from '../auth/role-auth.decorator';
import { RoleGuard } from '../auth/role-guard.service';
import { AuthorizedUser } from '../users/authorized-user.decorator';
import { UserPayload } from '../users/user-payload.type';
import { Role } from '../roles/roles.model';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @UseGuards(RoleGuard)
  @RequireRole('Admin')
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  @UseGuards(RoleGuard)
  @RequireRole('Admin', 'Client')
  findAll(@AuthorizedUser() user: UserPayload) {
    switch (user.role) {
      case 'Admin':
        return this.doctorsService.findAll();
      case 'Client':
        return this.doctorsService.findAllPublic();
    }
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @RequireRole('Admin')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findByIdWithUser(+id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @RequireRole('Admin')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @RequireRole('Admin')
  remove(@Param('id') id: string) {
    return this.doctorsService.deleteById(+id);
  }

  @Get(':id/visits')
  @UseGuards(RoleGuard)
  @RequireRole('Doctor')
  getVisitsByDoctor(@AuthorizedUser() user: UserPayload) {
    return this.doctorsService.getDoctorVisits(user.id);
  }
}
