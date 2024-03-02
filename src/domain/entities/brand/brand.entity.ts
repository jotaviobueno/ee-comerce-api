import { Brand } from '@prisma/client';

export class BrandEntity implements Brand {
  id: string;
  name: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
