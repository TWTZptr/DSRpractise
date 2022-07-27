import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import {
  DOCTOR_EDUCATION_MAX_LENGTH,
  DOCTOR_NAME_MAX_LENGTH,
  DOCTOR_PHONE_MAX_LENGTH,
} from './constants';
import { Pet } from '../pets/pets.model';
import { Visit } from '../visits/visits.model';

interface DoctorCreationAttributes {
  name: string;
  phone: string;
}

@Table({ tableName: 'Doctors' })
export class Doctor extends Model<Doctor, DoctorCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING(DOCTOR_NAME_MAX_LENGTH), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(DOCTOR_PHONE_MAX_LENGTH), allowNull: false })
  phone: string;

  @Column({
    type: DataType.STRING(DOCTOR_EDUCATION_MAX_LENGTH),
    allowNull: false,
    defaultValue: '',
  })
  education: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
  })
  experience: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
  })
  achievements: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
    field: 'service_types',
  })
  serviceTypes: string;

  @HasMany(() => Visit, 'doctor_id')
  visits: Visit[];
}
