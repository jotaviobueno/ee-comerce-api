import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CouponRepository } from '../../coupon.repository';
import { FindByIdCouponUseCase } from '../find-by-id';

@Injectable()
export class SoftDeleteCouponUseCase implements UseCaseBase<string, boolean> {
  constructor(
    private readonly couponRepository: CouponRepository,
    private readonly findByIdCouponUseCase: FindByIdCouponUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const coupon = await this.findByIdCouponUseCase.execute(data);

    const remove = await this.couponRepository.softDelete(coupon.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
