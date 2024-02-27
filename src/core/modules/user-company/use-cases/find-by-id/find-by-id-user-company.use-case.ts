import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UserCompanyEntity } from 'src/domain/entities';
import { UserCompanyRepository } from '../../user-company.repository';

@Injectable()
export class FindByIdUserCompanyUseCase
  implements UseCaseBase<string, UserCompanyEntity>
{
  constructor(private readonly userCompanyRepository: UserCompanyRepository) {}

  async execute(data: string): Promise<UserCompanyEntity> {
    const userCompany = await this.userCompanyRepository.findById(data);

    if (!userCompany)
      throw new HttpException('User company not found', HttpStatus.NOT_FOUND);

    return userCompany;
  }
}
