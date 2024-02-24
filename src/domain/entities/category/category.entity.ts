import { Category } from '@prisma/client';

export class CategoryEntity implements Category {
  id: string;
  name: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
