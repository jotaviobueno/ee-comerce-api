import { Injectable } from '@nestjs/common';
import { CreatePageDto, UpdatePageDto } from 'src/domain/dtos';
import { PageEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/common/factories';

@Injectable()
export class PageRepository extends RepositoryFactory<
  PageEntity,
  CreatePageDto,
  UpdatePageDto
> {
  constructor() {
    super('page');
  }

  findById(id: string): Promise<PageEntity | null> {
    return this.prismaService.page.findFirst({
      where: { id, deletedAt: null },
    });
  }
}
