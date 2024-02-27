import { Module, forwardRef } from '@nestjs/common';
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
import { RedisModule } from 'src/infra/redis/redis.module';
import { StoreModule } from '../store/store.module';
import { BrandModule } from '../brand/brand.module';

export const productModuleMock = {
  imports: [
    PrismaModule,
    RedisModule,
    forwardRef(() => StoreModule),
    BrandModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductRepository,
    CreateProductUseCase,
    FindByIdProductUseCase,
    FindAllProductByStoreIdUseCase,
    UpdateProductUseCase,
    SoftDeleteProductUseCase,
  ],
  exports: [FindByIdProductUseCase, FindAllProductByStoreIdUseCase],
};

@Module(productModuleMock)
export class ProductModule {}
