import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandRepository } from './brand.repository';
import { S3Module } from '../s3/s3.module';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import {
  CreateBrandUseCase,
  FindByIdBrandUseCase,
  FindAllBrandUseCase,
  SoftDeleteBrandUseCase,
  UpdateBrandUseCase,
} from './use-cases';

@Module({
  imports: [PrismaModule, S3Module],
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
