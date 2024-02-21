import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { UserModule } from './modules/user/user.module';
import { StoreModule } from './modules/store/store.module';
import { ProductModule } from './modules/product/product.module';
import { SkuModule } from './modules/sku/sku.module';
import { ColorModule } from './modules/color/color.module';
import { PrismaModule } from './common/database/prisma/prisma.module';
import { RedisModule } from './common/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/guards';
import { CategoryModule } from './modules/category/category.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { RatingModule } from './modules/rating/rating.module';
import { PageModule } from './modules/page/page.module';
import { S3Module } from './modules/s3/s3.module';

@Module({
  imports: [
    RedisModule,
    PrismaModule,
    HealthModule,
    UserModule,
    StoreModule,
    ProductModule,
    SkuModule,
    ColorModule,
    AuthModule,
    CategoryModule,
    ProductCategoryModule,
    RatingModule,
    PageModule,
    S3Module,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
