import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './doctors.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService],
  imports: [SequelizeModule.forFeature([Doctor]), AuthModule],
})
export class DoctorsModule {}
