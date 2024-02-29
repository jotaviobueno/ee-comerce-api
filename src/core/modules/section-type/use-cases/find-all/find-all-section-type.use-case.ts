import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { SectionTypeEntity } from 'src/domain/entities';
import { SectionTypeRepository } from '../../section-type.repository';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class FindAllSectionTypeUseCase
  implements UseCaseBase<QueryParamsDto, SectionTypeEntity[]>
{
  constructor(
    private readonly sectionTypeRepository: SectionTypeRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(data: QueryParamsDto): Promise<SectionTypeEntity[]> {
    const cache = await this.cacheManager.get<SectionTypeEntity[] | null>(
      'sectionTypes',
    );

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const sectionTypes = await this.sectionTypeRepository.findAll(query);

    await this.cacheManager.set('sectionTypes', sectionTypes);

    return sectionTypes;
  }
}
