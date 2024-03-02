import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { ColorEntity, FindAllResultEntity } from 'src/domain/entities';
import { ColorRepository } from '../../color.repository';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class FindAllColorUseCase
  implements UseCaseBase<QueryParamsDto, FindAllResultEntity<ColorEntity>>
{
  constructor(
    private readonly colorRepository: ColorRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(
    data: QueryParamsDto,
  ): Promise<FindAllResultEntity<ColorEntity>> {
    const cache =
      await this.cacheManager.get<FindAllResultEntity<ColorEntity> | null>(
        'colors',
      );

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const colors = await this.colorRepository.findAll(query);
    const total = await this.colorRepository.count(query);

    const result: FindAllResultEntity<ColorEntity> = {
      data: colors,
      total,
      page: data.page,
      totalPage: Math.ceil(total / data.pageSize),
      pageSize: data.pageSize,
    };

    await this.cacheManager.set('colors', result);

    return result;
  }
}
