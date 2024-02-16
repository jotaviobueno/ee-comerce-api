import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
