import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [PrismaModule, HealthModule, UserModule],
})
export class AppModule {}
