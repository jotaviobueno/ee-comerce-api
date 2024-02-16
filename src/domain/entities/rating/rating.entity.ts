import { Rating } from '@prisma/client';

export class RatingEntity implements Rating {
  id: string;
  name: string;
  description: string;
  stars: number;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
