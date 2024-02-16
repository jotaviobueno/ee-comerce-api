import { Module } from '@nestjs/common';
import { SkuController } from './sku.controller';
import { SkuRepository } from './sku.repository';
import { PrismaModule } from 'src/common/database/prisma/prisma.module';
import { ColorModule } from '../color/color.module';
import { ProductModule } from '../product/product.module';
import { CreateSkuUseCase, FindAllSkuUseCase } from './use-cases';

export const skuModuleMock = {
  imports: [PrismaModule, ColorModule, ProductModule],
  controllers: [SkuController],
  providers: [SkuRepository, CreateSkuUseCase, FindAllSkuUseCase],
};

@Module(skuModuleMock)
export class SkuModule {}
