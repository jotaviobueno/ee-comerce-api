import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateUserCompanyDto, UpdateUserCompanyDto } from 'src/domain/dtos';
import { UserCompanyEntity } from 'src/domain/entities';

@Injectable()
export class UserCompanyRepository extends RepositoryFactory<
  UserCompanyEntity,
  CreateUserCompanyDto,
  UpdateUserCompanyDto
> {
  constructor() {
    super('userCompany');
  }

  findById(id: string): Promise<UserCompanyEntity | null> {
    return this.prismaService.userCompany.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findByCompanyIdAndUserId(
    userId: string,
    companyId: string,
  ): Promise<UserCompanyEntity | null> {
    return this.prismaService.userCompany.findFirst({
      where: {
        userId,
        companyId,
        deletedAt: null,
      },
    });
  }
}
