import { Module } from '@nestjs/common';
import { FooterController } from './footer.controller';
import { FooterRepository } from './footer.repository';
import {
  FindByIdFooterUseCase,
  CreateFooterUseCase,
  UpdateFooterUseCase,
  SoftDeleteFooterUseCase,
} from './use-cases';
import { PageModule } from '../page/page.module';

export const footerModuleMock = {
  imports: [PageModule],
  controllers: [FooterController],
  providers: [
    FooterRepository,
    CreateFooterUseCase,
    UpdateFooterUseCase,
    SoftDeleteFooterUseCase,
    FindByIdFooterUseCase,
  ],
  exports: [FindByIdFooterUseCase],
};

@Module(footerModuleMock)
export class FooterModule {}
