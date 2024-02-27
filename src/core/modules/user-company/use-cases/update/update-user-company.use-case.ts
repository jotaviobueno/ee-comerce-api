import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UpdateUserCompanyDto } from 'src/domain/dtos';
import { UserCompanyEntity } from 'src/domain/entities';
import { UserCompanyRepository } from '../../user-company.repository';
import { FindByIdUserCompanyUseCase } from '../find-by-id';
import { FindByIdCompanyUseCase } from 'src/core/modules/company/use-cases';
import { FindByIdUserUseCase } from 'src/core/modules/user/use-cases';

@Injectable()
export class UpdateUserCompanyUseCase
  implements UseCaseBase<UpdateUserCompanyDto, UserCompanyEntity>
{
  constructor(
    private readonly userCompanyRepository: UserCompanyRepository,
    private readonly findByIdUserCompanyUseCase: FindByIdUserCompanyUseCase,
    @Inject(forwardRef(() => FindByIdCompanyUseCase))
    private readonly findByIdCompanyUseCase: FindByIdCompanyUseCase,
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
  ) {}

  async execute(data: UpdateUserCompanyDto): Promise<UserCompanyEntity> {
    const userCompany = await this.findByIdUserCompanyUseCase.execute(data.id);

    if (data.companyId) {
      const company = await this.findByIdCompanyUseCase.execute(data.companyId);

      //TODO: payload pode estar invalido porque ele valida apenas com o id do usuario que já está na company.
      //   Esse 'problema' persiste nos dois IFS
      const companyAlreadyExistInUser =
        await this.userCompanyRepository.findByCompanyIdAndUserId(
          userCompany.userId,
          company.id,
        );

      if (companyAlreadyExistInUser)
        throw new HttpException(
          'User already exist in this company',
          HttpStatus.CONFLICT,
        );
    }

    if (data.userId) {
      const user = await this.findByIdUserUseCase.execute(data.userId);

      const userAlreadyExistInCompany =
        await this.userCompanyRepository.findByCompanyIdAndUserId(
          user.id,
          userCompany.companyId,
        );

      if (userAlreadyExistInCompany)
        throw new HttpException(
          'User already exist in this company',
          HttpStatus.CONFLICT,
        );
    }

    const update = await this.userCompanyRepository.update({
      ...data,
      id: userCompany.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
