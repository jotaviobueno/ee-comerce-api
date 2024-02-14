import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
