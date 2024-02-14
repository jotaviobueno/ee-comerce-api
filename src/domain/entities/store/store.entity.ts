import { Store } from '@prisma/client';

export class StoreEntity implements Store {
  id: string;
  name: string;
  userId: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
