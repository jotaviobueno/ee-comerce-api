import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import {
  CreateProductUseCase,
  FindAllProductByStoreIdUseCase,
  FindByIdProductUseCase,
  SoftDeleteProductUseCase,
  UpdateProductUseCase,
} from './use-cases';
import { StoreModule } from '../store/store.module';
import { RedisModule } from 'src/infra/redis/redis.module';

export const productModuleMock = {
  imports: [PrismaModule, StoreModule, RedisModule],
  controllers: [ProductController],
  providers: [
    ProductRepository,
    CreateProductUseCase,
    FindByIdProductUseCase,
    FindAllProductByStoreIdUseCase,
    UpdateProductUseCase,
    SoftDeleteProductUseCase,
  ],
  exports: [FindByIdProductUseCase],
};

@Module(productModuleMock)
export class ProductModule {}
