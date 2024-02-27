import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateCompanyDto, UpdateCompanyDto } from 'src/domain/dtos/company';
import { CompanyEntity } from 'src/domain/entities';

@Injectable()
export class CompanyRepository extends RepositoryFactory<
  CompanyEntity,
  CreateCompanyDto,
  UpdateCompanyDto
> {
  constructor() {
    super('company');
  }

  findByCnpj(cnpj: string): Promise<CompanyEntity | null> {
    return this.prismaService.company.findFirst({
      where: {
        cnpj,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<CompanyEntity | null> {
    return this.prismaService.company.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
