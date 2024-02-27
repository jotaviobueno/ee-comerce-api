import { Module, forwardRef } from '@nestjs/common';
import { UserCompanyController } from './user-company.controller';
import { UserModule } from '../user/user.module';
import { CompanyModule } from '../company/company.module';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import {
  CreateUserCompanyUseCase,
  FindByIdUserCompanyUseCase,
  UpdateUserCompanyUseCase,
  SoftDeleteUserCompanyUseCase,
  JustCreateUserCompanyUseCase,
} from './use-cases';
import { UserCompanyRepository } from './user-company.repository';

@Module({
  imports: [UserModule, forwardRef(() => CompanyModule), PrismaModule],
  controllers: [UserCompanyController],
  providers: [
    CreateUserCompanyUseCase,
    UserCompanyRepository,
    FindByIdUserCompanyUseCase,
    UpdateUserCompanyUseCase,
    SoftDeleteUserCompanyUseCase,
    JustCreateUserCompanyUseCase,
  ],
  exports: [FindByIdUserCompanyUseCase, JustCreateUserCompanyUseCase],
})
export class UserCompanyModule {}
