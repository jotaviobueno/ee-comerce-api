import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import {
  CreateUserUseCase,
  FindAllUserUseCase,
  FindByIdUserUseCase,
  UpdateUserUseCase,
  SoftDeleteUserUseCase,
} from './use-cases';
import { PrismaModule } from 'src/database/prisma/prisma.module';

export const userModuleMock = {
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindAllUserUseCase,
    FindByIdUserUseCase,
    UpdateUserUseCase,
    SoftDeleteUserUseCase,
    UserRepository,
  ],
  exports: [FindByIdUserUseCase],
};

@Module(userModuleMock)
export class UserModule {}
