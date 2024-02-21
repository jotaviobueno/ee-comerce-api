import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { RedisModule } from 'src/infra/redis/redis.module';
import {
  CreateCategoryUseCase,
  FindAllCategoryUseCase,
  FindByIdCategoryUseCase,
  UpdateCategoryUseCase,
  SoftDeleteCategoryUseCase,
} from './use-cases';

export const categoryModuleMock = {
  imports: [PrismaModule, RedisModule],
  controllers: [CategoryController],
  providers: [
    CategoryRepository,
    CreateCategoryUseCase,
    FindAllCategoryUseCase,
    UpdateCategoryUseCase,
    FindByIdCategoryUseCase,
    SoftDeleteCategoryUseCase,
  ],
  exports: [FindByIdCategoryUseCase],
};

@Module(categoryModuleMock)
export class CategoryModule {}
