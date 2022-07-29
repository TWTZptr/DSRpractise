import { IsNotEmpty, IsNumber, IsOptional, Length } from 'class-validator';
import {
  DOCTOR_EDUCATION_MAX_LENGTH,
  DOCTOR_EDUCATION_MIN_LENGTH,
  DOCTOR_NAME_MAX_LENGTH,
  DOCTOR_NAME_MIN_LENGTH,
  DOCTOR_PHONE_MAX_LENGTH,
  DOCTOR_PHONE_MIN_LENGTH,
} from '../constants';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../users/constants';

export class CreateDoctorDto {
  @IsNotEmpty()
  @Length(DOCTOR_NAME_MIN_LENGTH, DOCTOR_NAME_MAX_LENGTH)
  name: string;

  @IsNotEmpty()
  @Length(DOCTOR_PHONE_MIN_LENGTH, DOCTOR_PHONE_MAX_LENGTH)
  phone: string;

  @IsOptional()
  @Length(DOCTOR_EDUCATION_MIN_LENGTH, DOCTOR_EDUCATION_MAX_LENGTH)
  education?: string;

  @IsOptional()
  experience?: string;

  @IsOptional()
  achievements?: string;

  @IsOptional()
  serviceTypes?: string;

  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)
  password: string;
}
