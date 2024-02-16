import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import {
  CreateProductUseCase,
  FindAllProductUseCase,
  FindByIdProductUseCase,
  SoftDeleteProductUseCase,
  UpdateProductUseCase,
} from './use-cases';
import { StoreModule } from '../store/store.module';

export const productModuleMock = {
  imports: [PrismaModule, StoreModule],
  controllers: [ProductController],
  providers: [
    ProductRepository,
    CreateProductUseCase,
    FindByIdProductUseCase,
    FindAllProductUseCase,
    UpdateProductUseCase,
    SoftDeleteProductUseCase,
  ],
  exports: [FindByIdProductUseCase],
};

@Module(productModuleMock)
export class ProductModule {}
