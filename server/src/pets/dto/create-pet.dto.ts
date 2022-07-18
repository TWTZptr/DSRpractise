import { IsInt, IsNotEmpty, Length } from 'class-validator';
import {
  MAX_BREED_LENGTH,
  MAX_PET_INFO_LENGTH,
  MAX_PET_NAME_LENGTH,
  MIN_BREED_LENGTH,
  MIN_PET_INFO_LENGTH,
  MIN_PET_NAME_LENGTH,
} from '../constants';

export class CreatePetDto {
  @IsNotEmpty()
  @Length(MIN_BREED_LENGTH, MAX_BREED_LENGTH)
  breed: string;

  @IsNotEmpty()
  @Length(MIN_PET_NAME_LENGTH, MAX_PET_NAME_LENGTH)
  name: string;

  @Length(MIN_PET_INFO_LENGTH, MAX_PET_INFO_LENGTH)
  info: string;

  photo?: string;

  @IsNotEmpty()
  @IsInt()
  typeId: number;
}
