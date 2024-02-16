import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { UserModule } from '../user/user.module';
import {
  CreateStoreUseCase,
  FindAllStoreUseCase,
  FindByIdStoreUseCase,
  UpdateStoreUseCase,
  SoftDeleteStoreUseCase,
} from './use-cases';
import { StoreRepository } from './store.repository';
import { PrismaModule } from 'src/common/database/prisma/prisma.module';

export const storeModuleMock = {
  imports: [PrismaModule, UserModule],
  controllers: [StoreController],
  providers: [
    StoreRepository,
    CreateStoreUseCase,
    FindAllStoreUseCase,
    FindByIdStoreUseCase,
    UpdateStoreUseCase,
    SoftDeleteStoreUseCase,
  ],
  exports: [FindByIdStoreUseCase],
};

@Module(storeModuleMock)
export class StoreModule {}
