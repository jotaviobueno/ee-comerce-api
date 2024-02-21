import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { SkuEntity } from 'src/domain/entities';
import { SkuRepository } from '../../sku.repository';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class FindAllSkuUseCase
  implements UseCaseBase<QueryParamsDto, SkuEntity[]>
{
  constructor(
    private readonly skuRepository: SkuRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(data: QueryParamsDto): Promise<SkuEntity[]> {
    const cache = await this.cacheManager.get<SkuEntity[] | null>('skus');

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const skus = await this.skuRepository.findAll(query);

    await this.cacheManager.set('skus', skus);

    return skus;
  }
}
