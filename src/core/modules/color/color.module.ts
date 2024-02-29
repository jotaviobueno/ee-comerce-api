import { Module } from '@nestjs/common';
import { ColorController } from './color.controller';
import { ColorRepository } from './color.repository';
import {
  FindByIdColorUseCase,
  CreateColorUseCase,
  FindAllColorUseCase,
  UpdateColorUseCase,
  SoftDeleteColorUseCase,
} from './use-cases';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { RedisModule } from 'src/infra/redis/redis.module';
import { StoreModule } from '../store/store.module';

export const colorModuleMock = {
  imports: [PrismaModule, RedisModule, StoreModule],
  controllers: [ColorController],
  providers: [
    ColorRepository,
    FindByIdColorUseCase,
    CreateColorUseCase,
    FindAllColorUseCase,
    UpdateColorUseCase,
    SoftDeleteColorUseCase,
  ],
  exports: [FindByIdColorUseCase],
};

@Module(colorModuleMock)
export class ColorModule {}
