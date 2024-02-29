import { Module } from '@nestjs/common';
import { SectionTypeController } from './section-type.controller';
import { SectionTypeRepository } from './section-type.repository';
import {
  CreateSectionTypeUseCase,
  FindAllSectionTypeUseCase,
  FindByIdSectionTypeUseCase,
  SoftDeleteSectionTypeUseCase,
  UpdaateSectionTypeUseCase,
} from './use-cases';

@Module({
  controllers: [SectionTypeController],
  providers: [
    SectionTypeRepository,
    CreateSectionTypeUseCase,
    FindAllSectionTypeUseCase,
    FindByIdSectionTypeUseCase,
    SoftDeleteSectionTypeUseCase,
    UpdaateSectionTypeUseCase,
  ],
  exports: [FindByIdSectionTypeUseCase],
})
export class SectionTypeModule {}
