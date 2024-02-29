import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandRepository } from './brand.repository';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import {
  CreateBrandUseCase,
  FindByIdBrandUseCase,
  FindAllBrandUseCase,
  SoftDeleteBrandUseCase,
  UpdateBrandUseCase,
} from './use-cases';

@Module({
  imports: [PrismaModule],
  controllers: [BrandController],
  providers: [
    BrandRepository,
    CreateBrandUseCase,
    FindByIdBrandUseCase,
    FindAllBrandUseCase,
    SoftDeleteBrandUseCase,
    UpdateBrandUseCase,
  ],
  exports: [FindByIdBrandUseCase],
})
export class BrandModule {}
