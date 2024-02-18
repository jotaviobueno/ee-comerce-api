import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { ColorEntity } from 'src/domain/entities';
import { ColorRepository } from '../../color.repository';
import { QueryBuilder } from 'src/domain/utils';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class FindAllColorUseCase
  implements UseCaseBase<QueryParamsDto, ColorEntity[]>
{
  constructor(
    private readonly colorRepository: ColorRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(data: QueryParamsDto): Promise<ColorEntity[]> {
    const cache = await this.cacheManager.get<ColorEntity[] | null>('colors');

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const colors = await this.colorRepository.findAll(query);

    await this.cacheManager.set('colors', colors);

    return colors;
  }
}
