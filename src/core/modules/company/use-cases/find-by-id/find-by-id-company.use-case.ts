import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CompanyEntity } from 'src/domain/entities';
import { CompanyRepository } from '../../company.repository';

@Injectable()
export class FindByIdCompanyUseCase
  implements UseCaseBase<string, CompanyEntity>
{
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(data: string): Promise<CompanyEntity> {
    const company = await this.companyRepository.findById(data);

    if (!company)
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);

    return company;
  }
}
