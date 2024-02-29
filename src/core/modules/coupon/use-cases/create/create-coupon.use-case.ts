import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { FindByIdStoreUseCase } from 'src/core/modules/store/use-cases';
import { CreateCouponDto } from 'src/domain/dtos';
import { CouponEntity } from 'src/domain/entities';
import { CouponRepository } from '../../coupon.repository';

@Injectable()
export class CreateCouponUseCase
  implements UseCaseBase<CreateCouponDto, CouponEntity>
{
  constructor(
    private readonly findByIdStoreUseCase: FindByIdStoreUseCase,
    private readonly couponRepository: CouponRepository,
  ) {}

  async execute(data: CreateCouponDto): Promise<CouponEntity> {
    const store = await this.findByIdStoreUseCase.execute(data.storeId);

    const coupon = await this.couponRepository.create({
      ...data,
      storeId: store.id,
    });

    return coupon;
  }
}
