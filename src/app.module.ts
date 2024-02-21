import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './core/modules/health/health.module';
import { UserModule } from './core/modules/user/user.module';
import { StoreModule } from './core/modules/store/store.module';
import { ProductModule } from './core/modules/product/product.module';
import { SkuModule } from './core/modules/sku/sku.module';
import { ColorModule } from './core/modules/color/color.module';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { RedisModule } from './infra/redis/redis.module';
import { AuthModule } from './core/modules/auth/auth.module';
import { AuthGuard } from './core/modules/auth/guards';
import { CategoryModule } from './core/modules/category/category.module';
import { ProductCategoryModule } from './core/modules/product-category/product-category.module';
import { RatingModule } from './core/modules/rating/rating.module';
import { PageModule } from './core/modules/page/page.module';
import { S3Module } from './core/modules/s3/s3.module';

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
