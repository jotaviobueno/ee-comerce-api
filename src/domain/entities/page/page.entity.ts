import { Page } from '@prisma/client';

export class PageEntity implements Page {
  id: string;
  images: string[];
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
