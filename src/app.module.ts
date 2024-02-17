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
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
