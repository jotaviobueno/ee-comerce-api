import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { StoreModule } from '../store/store.module';
import {
  CreateCouponUseCase,
  FindByIdCouponUseCase,
  SoftDeleteCouponUseCase,
  UpdateCouponUseCase,
} from './use-cases';
import { CouponRepository } from './coupon.repository';

@Module({
  imports: [PrismaModule, StoreModule],
  controllers: [CouponController],
  providers: [
    CouponRepository,
    CreateCouponUseCase,
    FindByIdCouponUseCase,
    SoftDeleteCouponUseCase,
    UpdateCouponUseCase,
  ],
  exports: [FindByIdCouponUseCase],
})
export class CouponModule {}
