import { Page } from '@prisma/client';

export class PageEntity implements Page {
  id: string;
  name: string;
  description: string | null;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
