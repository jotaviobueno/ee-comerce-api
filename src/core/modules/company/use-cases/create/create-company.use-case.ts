import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CreateCompanyDto } from 'src/domain/dtos/company';
import { CompanyEntity } from 'src/domain/entities';
import { CompanyRepository } from '../../company.repository';
import { JustCreateUserCompanyUseCase } from 'src/core/modules/user-company/use-cases';

@Injectable()
export class CreateCompanyUseCase
  implements UseCaseBase<CreateCompanyDto & { userId: string }, CompanyEntity>
{
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly justCreateUserCompanyUseCase: JustCreateUserCompanyUseCase,
  ) {}

  async execute({
    userId,
    ...data
  }: CreateCompanyDto & { userId: string }): Promise<CompanyEntity> {
    const cnpjAlreadyExist = await this.companyRepository.findByCnpj(data.cnpj);

    if (cnpjAlreadyExist)
      throw new HttpException('Cnpj already exist', HttpStatus.CONFLICT);

    const company = await this.companyRepository.create(data);

    await this.justCreateUserCompanyUseCase.execute({
      companyId: company.id,
      userId,
    });

    return company;
  }
}
