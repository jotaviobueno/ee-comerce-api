import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { FooterEntity } from 'src/domain/entities';
import { FooterRepository } from '../../footer.repository';
import { CreateFooterDto } from 'src/domain/dtos';
import { FindByIdPageUseCase } from 'src/core/modules/page/use-cases';
import { FindByIdFooterUseCase } from '../find-by-id';

@Injectable()
export class CreateFooterUseCase
  implements UseCaseBase<CreateFooterDto, FooterEntity>
{
  constructor(
    private readonly footerRepository: FooterRepository,
    private readonly findByIdPageUseCase: FindByIdPageUseCase,
    private readonly findByIdFooterUseCase: FindByIdFooterUseCase,
  ) {}

  async execute(data: CreateFooterDto): Promise<FooterEntity> {
    const page = await this.findByIdPageUseCase.execute(data.pageId);

    if (data.parentId) await this.findByIdFooterUseCase.execute(data.parentId);

    const footer = await this.footerRepository.create({
      ...data,
      pageId: page.id,
    });

    return footer;
  }
}
