import { IsNotEmpty, Length } from 'class-validator';
import {
  DOCTOR_EDUCATION_MAX_LENGTH,
  DOCTOR_EDUCATION_MIN_LENGTH,
  DOCTOR_NAME_MAX_LENGTH,
  DOCTOR_NAME_MIN_LENGTH,
  DOCTOR_PHONE_MAX_LENGTH,
  DOCTOR_PHONE_MIN_LENGTH,
} from '../constants';

export class CreateDoctorDto {
  @IsNotEmpty()
  @Length(DOCTOR_NAME_MIN_LENGTH, DOCTOR_NAME_MAX_LENGTH)
  name: string;

  @IsNotEmpty()
  @Length(DOCTOR_PHONE_MIN_LENGTH, DOCTOR_PHONE_MAX_LENGTH)
  phone: string;

  @Length(DOCTOR_EDUCATION_MIN_LENGTH, DOCTOR_EDUCATION_MAX_LENGTH)
  education?: string;

  experience?: string;

  achievements?: string;

  serviceTypes?: string;
}
