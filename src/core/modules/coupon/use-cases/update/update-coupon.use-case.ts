import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UpdateCouponDto } from 'src/domain/dtos';
import { CouponEntity } from 'src/domain/entities';
import { FindByIdCouponUseCase } from '../find-by-id';
import { CouponRepository } from '../../coupon.repository';

@Injectable()
export class UpdateCouponUseCase
  implements UseCaseBase<UpdateCouponDto, CouponEntity>
{
  constructor(
    private readonly findByIdCouponUseCase: FindByIdCouponUseCase,
    private readonly couponRepository: CouponRepository,
  ) {}

  async execute(data: UpdateCouponDto): Promise<CouponEntity> {
    const coupon = await this.findByIdCouponUseCase.execute(data.id);

    const update = await this.couponRepository.update({
      ...data,
      id: coupon.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
