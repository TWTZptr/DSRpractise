import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from './config/sequelize.config.service';
import { RolesModule } from './roles/roles.module';
import { PetTypesModule } from './pet-types/pet-types.module';
import { PetsModule } from './pets/pets.module';
import { VisitsModule } from './visits/visits.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    UsersModule,
    RolesModule,
    PetTypesModule,
    PetsModule,
    VisitsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
