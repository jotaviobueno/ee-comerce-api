import { SectionType } from '@prisma/client';

export class SectionTypeEntity implements SectionType {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
