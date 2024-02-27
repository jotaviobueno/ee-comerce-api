import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UserCompanyRepository } from '../../user-company.repository';
import { FindByIdUserCompanyUseCase } from '../find-by-id';

@Injectable()
export class SoftDeleteUserCompanyUseCase
  implements UseCaseBase<string, boolean>
{
  constructor(
    private readonly userCompanyRepository: UserCompanyRepository,
    private readonly findByIdUserCompanyUseCase: FindByIdUserCompanyUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const userCompany = await this.findByIdUserCompanyUseCase.execute(data);

    const remove = await this.userCompanyRepository.softDelete(userCompany.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
