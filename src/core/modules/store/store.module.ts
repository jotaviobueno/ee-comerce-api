import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { UserModule } from '../user/user.module';
import {
  CreateStoreUseCase,
  FindByIdStoreUseCase,
  UpdateStoreUseCase,
  SoftDeleteStoreUseCase,
  FindAllProductsByStoreIdUseCase,
  FindAllCategoriesByStoreIdUseCase,
} from './use-cases';
import { StoreRepository } from './store.repository';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { RedisModule } from 'src/infra/redis/redis.module';
import { PageModule } from '../page/page.module';
import { ProductModule } from '../product/product.module';
import { CategoryModule } from '../category/category.module';
import { S3Module } from '../s3/s3.module';

export const storeModuleMock = {
  imports: [
    PrismaModule,
    UserModule,
    RedisModule,
    PageModule,
    ProductModule,
    CategoryModule,
    S3Module,
  ],
  controllers: [StoreController],
  providers: [
    StoreRepository,
    CreateStoreUseCase,
    FindByIdStoreUseCase,
    UpdateStoreUseCase,
    SoftDeleteStoreUseCase,
    FindAllProductsByStoreIdUseCase,
    FindAllCategoriesByStoreIdUseCase,
  ],
  exports: [FindByIdStoreUseCase],
};

@Module(storeModuleMock)
export class StoreModule {}