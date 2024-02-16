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
import { PrismaModule } from 'src/database/prisma/prisma.module';

export const colorModuleMock = {
  imports: [PrismaModule],
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
