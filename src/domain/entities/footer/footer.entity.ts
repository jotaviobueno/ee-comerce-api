import { Footer } from '@prisma/client';

export class FooterEntity implements Footer {
  id: string;
  name: string;
  href: string | null;
  pageId: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
