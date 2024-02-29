import { Coupon } from '@prisma/client';

export class CouponEntity implements Coupon {
  id: string;
  name: string;
  description: string | null;
  code: string;
  discount: number;
  maxUsages: number;
  totalUsages: number;
  maxUsagesPerUser: number;
  isActive: boolean;
  storeId: string;
  fromAt: Date | null;
  toAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
