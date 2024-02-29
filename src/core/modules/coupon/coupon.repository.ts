import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateCouponDto, UpdateCouponDto } from 'src/domain/dtos';
import { CouponEntity } from 'src/domain/entities';

@Injectable()
export class CouponRepository extends RepositoryFactory<
  CouponEntity,
  CreateCouponDto,
  UpdateCouponDto
> {
  constructor() {
    super('coupon');
  }

  findById(id: string): Promise<CouponEntity | null> {
    return this.prismaService.coupon.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
