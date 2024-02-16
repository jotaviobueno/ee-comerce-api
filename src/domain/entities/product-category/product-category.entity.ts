import { ProductCategory } from '@prisma/client';

export class ProductCategoryEntity implements ProductCategory {
  id: string;
  categoryId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
