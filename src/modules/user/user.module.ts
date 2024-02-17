import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import {
  CreateUserUseCase,
  FindAllUserUseCase,
  FindByIdUserUseCase,
  UpdateUserUseCase,
  SoftDeleteUserUseCase,
  FindByEmailUserUseCase,
} from './use-cases';
import { PrismaModule } from 'src/common/database/prisma/prisma.module';
import { RedisModule } from 'src/common/redis/redis.module';

export const userModuleMock = {
  imports: [PrismaModule, RedisModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindAllUserUseCase,
    FindByIdUserUseCase,
    UpdateUserUseCase,
    SoftDeleteUserUseCase,
    FindByEmailUserUseCase,
    UserRepository,
  ],
  exports: [FindByIdUserUseCase, FindByEmailUserUseCase],
};

@Module(userModuleMock)
export class UserModule {}
