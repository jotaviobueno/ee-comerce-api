import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  cost: number;
  brandId: string | null;
  storeId: string;
  parentId: string | null;
  colorId: string;
  upc: string | null;
  ean: string | null;
  width: string | null;
  length: string | null;
  height: string | null;
  weight: string | null;
  size: string | null;
  isActive: boolean;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
