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
import { PrismaModule } from 'src/common/database/prisma/prisma.module';
import { RedisModule } from 'src/common/redis/redis.module';

export const colorModuleMock = {
  imports: [PrismaModule, RedisModule],
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
