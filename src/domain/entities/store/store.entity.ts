import { Store } from '@prisma/client';

export class StoreEntity implements Store {
  id: string;
  name: string;
  logo: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
