import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class CreateVisitDto {
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsInt()
  petId: number;
}
