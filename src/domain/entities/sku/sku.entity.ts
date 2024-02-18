import { Sku, SKU_SIZE } from '@prisma/client';

export class SkuEntity implements Sku {
  id: string;
  width: number;
  length: number;
  height: number;
  batchs: string[];
  weight: number;
  size: SKU_SIZE;
  costPrice: number;
  quantity: number;
  productId: string;
  colorId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
