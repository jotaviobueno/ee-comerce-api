import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import {
  CreateCompanyUseCase,
  FindByIdCompanyUseCase,
  SoftDeleteCompanyUseCase,
  UpdateCompanyUsecase,
} from './use-cases';
import { UserModule } from '../user/user.module';
import { CompanyRepository } from './company.repository';
import { UserCompanyModule } from '../user-company/user-company.module';

@Module({
  imports: [UserModule, UserCompanyModule],
  controllers: [CompanyController],
  providers: [
    CompanyRepository,
    CreateCompanyUseCase,
    FindByIdCompanyUseCase,
    SoftDeleteCompanyUseCase,
    UpdateCompanyUsecase,
  ],
  exports: [FindByIdCompanyUseCase],
})
export class CompanyModule {}
