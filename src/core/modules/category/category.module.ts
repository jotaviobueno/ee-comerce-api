import { Module, forwardRef } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { RedisModule } from 'src/infra/redis/redis.module';
import {
  CreateCategoryUseCase,
  FindByIdCategoryUseCase,
  UpdateCategoryUseCase,
  SoftDeleteCategoryUseCase,
  FindAllCategoryByStoreIdUseCase,
} from './use-cases';
import { StoreModule } from '../store/store.module';

export const categoryModuleMock = {
  imports: [PrismaModule, RedisModule, forwardRef(() => StoreModule)],
  controllers: [CategoryController],
  providers: [
    CategoryRepository,
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    FindByIdCategoryUseCase,
    SoftDeleteCategoryUseCase,
    FindAllCategoryByStoreIdUseCase,
  ],
  exports: [FindByIdCategoryUseCase, FindAllCategoryByStoreIdUseCase],
};

@Module(categoryModuleMock)
export class CategoryModule {}
