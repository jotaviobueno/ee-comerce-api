import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateSectionTypeDto, UpdateSectionTypeDto } from 'src/domain/dtos';
import { QueryBuilderEntity, SectionTypeEntity } from 'src/domain/entities';

@Injectable()
export class SectionTypeRepository extends RepositoryFactory<
  SectionTypeEntity,
  CreateSectionTypeDto,
  UpdateSectionTypeDto
> {
  constructor() {
    super('sectionType');
  }

  findById(id: string): Promise<SectionTypeEntity | null> {
    return this.prismaService.sectionType.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll(query: QueryBuilderEntity): Promise<SectionTypeEntity[]> {
    return this.prismaService.sectionType.findMany(query);
  }
}
