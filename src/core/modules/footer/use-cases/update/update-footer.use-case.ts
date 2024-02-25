import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { FooterEntity } from 'src/domain/entities';
import { FooterRepository } from '../../footer.repository';
import { FindByIdFooterUseCase } from '../find-by-id';
import { UpdateFooterDto } from 'src/domain/dtos';

@Injectable()
export class UpdateFooterUseCase
  implements UseCaseBase<UpdateFooterDto, FooterEntity>
{
  constructor(
    private readonly footerRepository: FooterRepository,
    private readonly findByIdFooterUseCase: FindByIdFooterUseCase,
  ) {}

  async execute(data: UpdateFooterDto): Promise<FooterEntity> {
    const footer = await this.findByIdFooterUseCase.execute(data.id);

    const update = await this.footerRepository.update({
      ...data,
      id: footer.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
