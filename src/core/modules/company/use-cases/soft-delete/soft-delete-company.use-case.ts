import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { FindByIdCompanyUseCase } from '../find-by-id';
import { CompanyRepository } from '../../company.repository';

@Injectable()
export class SoftDeleteCompanyUseCase implements UseCaseBase<string, boolean> {
  constructor(
    private readonly findByIdCompanyUseCase: FindByIdCompanyUseCase,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(data: string): Promise<boolean> {
    const company = await this.findByIdCompanyUseCase.execute(data);

    const remove = await this.companyRepository.softDelete(company.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
