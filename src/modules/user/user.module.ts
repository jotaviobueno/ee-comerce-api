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
import { PrismaModule } from 'src/common/database/prisma/prisma.module';
import { CacheModule } from 'src/common/cache/cache.module';

export const userModuleMock = {
  imports: [PrismaModule, CacheModule],
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
