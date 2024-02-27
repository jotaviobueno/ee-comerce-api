import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UpdateCompanyDto } from 'src/domain/dtos/company';
import { CompanyEntity } from 'src/domain/entities';
import { FindByIdCompanyUseCase } from '../find-by-id';
import { CompanyRepository } from '../../company.repository';

@Injectable()
export class UpdateCompanyUsecase
  implements UseCaseBase<UpdateCompanyDto, CompanyEntity>
{
  constructor(
    private readonly findByIdCompanyUseCase: FindByIdCompanyUseCase,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(data: UpdateCompanyDto): Promise<CompanyEntity> {
    const company = await this.findByIdCompanyUseCase.execute(data.id);

    const update = await this.companyRepository.update({
      ...data,
      id: company.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
