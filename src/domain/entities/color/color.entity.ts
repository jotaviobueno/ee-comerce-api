import { Color } from '@prisma/client';

export class ColorEntity implements Color {
  id: string;
  name: string;
  hex: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
