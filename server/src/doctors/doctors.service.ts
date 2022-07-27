import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './doctors.model';
import { InjectModel } from '@nestjs/sequelize';
import { UNEXIST_DOCTOR_ID_MSG } from './constants';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor) private readonly doctorsRepository: typeof Doctor,
  ) {}

  create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorsRepository.create(createDoctorDto);
  }

  findAll(): Promise<Doctor[]> {
    return this.doctorsRepository.findAll();
  }

  findById(id: number): Promise<Doctor> {
    return this.doctorsRepository.findByPk(id);
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
