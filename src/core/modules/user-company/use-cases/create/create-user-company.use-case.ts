import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { FindByIdCompanyUseCase } from 'src/core/modules/company/use-cases';
import { FindByIdUserUseCase } from 'src/core/modules/user/use-cases';
import { CreateUserCompanyDto } from 'src/domain/dtos';
import { UserCompanyEntity } from 'src/domain/entities';
import { UserCompanyRepository } from '../../user-company.repository';

@Injectable()
export class CreateUserCompanyUseCase
  implements UseCaseBase<CreateUserCompanyDto, UserCompanyEntity>
{
  constructor(
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
    @Inject(forwardRef(() => FindByIdCompanyUseCase))
    private readonly findByIdCompanyUseCase: FindByIdCompanyUseCase,
    private readonly userCompanyRepository: UserCompanyRepository,
  ) {}

  async execute(data: CreateUserCompanyDto): Promise<UserCompanyEntity> {
    const user = await this.findByIdUserUseCase.execute(data.userId);

    const company = await this.findByIdCompanyUseCase.execute(data.companyId);

    const userAlreadyExistInCompany =
      await this.userCompanyRepository.findByCompanyIdAndUserId(
        user.id,
        company.id,
      );

    if (userAlreadyExistInCompany)
      throw new HttpException(
        'User already exist in this company',
        HttpStatus.CONFLICT,
      );

    const userCompany = await this.userCompanyRepository.create(data);

    return userCompany;
  }
}
