import { Module } from '@nestjs/common';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryRepository } from './product-category.repository';
import {
  CreateProductCategoryUseCase,
  FindByIdProductCategoryUseCase,
  UpdateProductCategoryUseCase,
} from './use-cases';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { ProductModule } from '../product/product.module';
import { CategoryModule } from '../category/category.module';

export const productCategoryModuleMock = {
  imports: [PrismaModule, ProductModule, CategoryModule],
  controllers: [ProductCategoryController],
  providers: [
    ProductCategoryRepository,
    CreateProductCategoryUseCase,
    FindByIdProductCategoryUseCase,
    UpdateProductCategoryUseCase,
  ],
  exports: [FindByIdProductCategoryUseCase],
};

@Module(productCategoryModuleMock)
export class ProductCategoryModule {}
