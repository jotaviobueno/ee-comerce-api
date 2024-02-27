import { Module } from '@nestjs/common';
import { SkuController } from './sku.controller';
import { SkuRepository } from './sku.repository';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { ColorModule } from '../color/color.module';
import { ProductModule } from '../product/product.module';
import {
  CreateSkuUseCase,
  FindAllSkuUseCase,
  FindByIdSkuUseCase,
  UpdateSkuUseCase,
  SoftDeleteSkuUseCase,
} from './use-cases';
import { RedisModule } from 'src/infra/redis/redis.module';
import { S3Module } from '../s3/s3.module';

export const skuModuleMock = {
  imports: [PrismaModule, ColorModule, ProductModule, RedisModule, S3Module],
  controllers: [SkuController],
  providers: [
    SkuRepository,
    CreateSkuUseCase,
    FindAllSkuUseCase,
    FindByIdSkuUseCase,
    UpdateSkuUseCase,
    SoftDeleteSkuUseCase,
  ],
  exports: [FindByIdSkuUseCase],
};

@Module(skuModuleMock)
export class SkuModule {}
