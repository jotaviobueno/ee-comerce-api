import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './modules/user/user.module';
import { StoreModule } from './modules/store/store.module';
import { ProductModule } from './modules/product/product.module';
import { SkuModule } from './modules/sku/sku.module';
import { ColorModule } from './modules/color/color.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    UserModule,
    StoreModule,
    ProductModule,
    SkuModule,
    ColorModule,
  ],
})
export class AppModule {}
