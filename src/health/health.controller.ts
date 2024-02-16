import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { environment } from 'src/config';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly database: PrismaHealthIndicator,
    private readonly prismaService: PrismaService,
  ) {}

  @Get('ping')
  @HealthCheck()
  healthCheck() {
    return {
      status: 'pong',
      version: environment.VERSION,
    };
  }

  @Get('prisma')
  @HealthCheck()
  async checkReadiness() {
    return this.healthCheckService.check([
      async () => this.database.pingCheck('prisma', this.prismaService),
    ]);
  }
}
