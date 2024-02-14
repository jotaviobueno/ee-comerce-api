import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './modules/user/user.module';
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [PrismaModule, HealthModule, UserModule, StoreModule],
})
export class AppModule {}
