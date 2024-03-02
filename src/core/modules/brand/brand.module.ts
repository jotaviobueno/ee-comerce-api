import { Module, forwardRef } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandRepository } from './brand.repository';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import {
  CreateBrandUseCase,
  FindByIdBrandUseCase,
  FindAllBrandByStoreIdUseCase,
  SoftDeleteBrandUseCase,
  UpdateBrandUseCase,
} from './use-cases';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [PrismaModule, forwardRef(() => StoreModule)],
  controllers: [BrandController],
  providers: [
    BrandRepository,
    CreateBrandUseCase,
    FindByIdBrandUseCase,
    FindAllBrandByStoreIdUseCase,
    SoftDeleteBrandUseCase,
    UpdateBrandUseCase,
  ],
  exports: [FindByIdBrandUseCase, FindAllBrandByStoreIdUseCase],
})
export class BrandModule {}
