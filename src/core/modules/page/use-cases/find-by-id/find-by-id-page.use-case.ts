import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { PageEntity } from 'src/domain/entities';
import { PageRepository } from '../../page.repository';

@Injectable()
export class FindByIdPageUseCase implements UseCaseBase<string, PageEntity> {
  constructor(private readonly pageRepository: PageRepository) {}

  async execute(data: string): Promise<PageEntity> {
    const page = await this.pageRepository.findById(data);

    if (!page) throw new HttpException('Page not found', HttpStatus.NOT_FOUND);

    return page;
  }
}
