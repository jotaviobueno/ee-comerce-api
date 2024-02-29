import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CouponEntity } from 'src/domain/entities';
import { CouponRepository } from '../../coupon.repository';

@Injectable()
export class FindByIdCouponUseCase
  implements UseCaseBase<string, CouponEntity>
{
  constructor(private readonly couponRepository: CouponRepository) {}

  async execute(data: string): Promise<CouponEntity> {
    const coupon = await this.couponRepository.findById(data);

    if (!coupon)
      throw new HttpException('Coupon not found', HttpStatus.NOT_FOUND);

    return coupon;
  }
}
