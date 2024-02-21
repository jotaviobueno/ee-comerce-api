import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { CreatePageDto } from 'src/domain/dtos';
import { PageEntity } from 'src/domain/entities';
import { PageRepository } from '../../page.repository';

@Injectable()
export class CreatePageUseCase
  implements UseCaseBase<CreatePageDto, PageEntity>
{
  constructor(private readonly pageRepository: PageRepository) {}

  async execute(data: CreatePageDto): Promise<PageEntity> {
    return this.pageRepository.create(data);
  }
}
