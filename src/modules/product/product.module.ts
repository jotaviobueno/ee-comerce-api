import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { PrismaModule } from 'src/common/database/prisma/prisma.module';
import {
  CreateProductUseCase,
  FindAllProductUseCase,
  FindByIdProductUseCase,
  SoftDeleteProductUseCase,
  UpdateProductUseCase,
} from './use-cases';
import { StoreModule } from '../store/store.module';
import { RedisModule } from 'src/common/redis/redis.module';

export const productModuleMock = {
  imports: [PrismaModule, StoreModule, RedisModule],
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
