import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './doctors.model';
import { InjectModel } from '@nestjs/sequelize';
import { UNEXIST_DOCTOR_ID_MSG } from './constants';
import { UsersService } from '../users/users.service';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor) private readonly doctorsRepository: typeof Doctor,
    private readonly usersService: UsersService,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const user = await this.usersService.createDoctor({
      password: createDoctorDto.password,
      login: createDoctorDto.login,
      phone: createDoctorDto.phone,
      name: createDoctorDto.name,
    });

    return this.doctorsRepository.create({
      ...createDoctorDto,
      userId: user.id,
    });
  }

  findAll(): Promise<Doctor[]> {
    return this.doctorsRepository.findAll();
  }

  async findById(id: number): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findByPk(id, {
      include: 'user',
    });
    doctor.user.password = undefined;
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const [affectedCount] = await this.doctorsRepository.update(
      updateDoctorDto,
      { where: { id } },
    );

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_DOCTOR_ID_MSG);
    }

    return this.findById(id);
  }

  async deleteById(id: number): Promise<void> {
    const affectedCount = await this.doctorsRepository.destroy({
      where: { id },
    });
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_DOCTOR_ID_MSG);
    }
  }
}
