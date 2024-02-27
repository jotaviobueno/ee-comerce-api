import { Company } from '@prisma/client';

export class CompanyEntity implements Company {
  id: string;
  name: string;
  fantasyName: string | null;
  cnpj: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
