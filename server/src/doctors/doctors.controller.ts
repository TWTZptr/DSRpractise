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
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { RequireRole } from '../auth/role-auth.decorator';
import { RoleGuard } from '../auth/role-guard.service';

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
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @RequireRole('Admin')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findById(+id);
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
}
