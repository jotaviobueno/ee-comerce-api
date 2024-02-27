import { UserCompany } from '@prisma/client';

export class UserCompanyEntity implements UserCompany {
  id: string;
  userId: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
