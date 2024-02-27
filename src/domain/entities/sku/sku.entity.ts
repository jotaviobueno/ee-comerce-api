import { Sku } from '@prisma/client';

export class SkuEntity implements Sku {
  id: string;
  width: string;
  length: string;
  height: string;
  weight: string;
  costPrice: number;
  price: number;
  quantity: number;
  upc: string | null;
  ean: string | null;
  isActive: boolean;
  documents: string[];
  productId: string;
  colorId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
