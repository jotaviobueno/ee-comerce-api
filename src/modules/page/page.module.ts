import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageRepository } from './page.repository';
import { CreatePageUseCase, FindByIdPageUseCase } from './use-cases';
import { PrismaModule } from 'src/common/database/prisma/prisma.module';
import { S3Module } from '../s3/s3.module';
import { UpdatePageUseCase } from './use-cases/update';

export const pageModuleMock = {
  imports: [PrismaModule, S3Module],
  controllers: [PageController],
  providers: [
    PageRepository,
    CreatePageUseCase,
    FindByIdPageUseCase,
    UpdatePageUseCase,
  ],
  exports: [CreatePageUseCase, FindByIdPageUseCase],
};

@Module(pageModuleMock)
export class PageModule {}
