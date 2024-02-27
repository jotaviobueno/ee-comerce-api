import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CreateUserCompanyDto } from 'src/domain/dtos';
import { UserCompanyEntity } from 'src/domain/entities';
import { UserCompanyRepository } from '../../user-company.repository';

@Injectable()
export class JustCreateUserCompanyUseCase
  implements UseCaseBase<CreateUserCompanyDto, UserCompanyEntity>
{
  constructor(private readonly userCompanyRepository: UserCompanyRepository) {}

  async execute(data: CreateUserCompanyDto): Promise<UserCompanyEntity> {
    const userCompany = await this.userCompanyRepository.create(data);

    return userCompany;
  }
}
