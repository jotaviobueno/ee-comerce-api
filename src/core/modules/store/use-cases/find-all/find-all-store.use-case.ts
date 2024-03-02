import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { SearchStoreDto } from 'src/domain/dtos';
import { FindAllResultEntity, StoreEntity } from 'src/domain/entities';
import { StoreRepository } from '../../store.repository';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class FindAllStoreUseCase
  implements UseCaseBase<SearchStoreDto, FindAllResultEntity<StoreEntity>>
{
  constructor(
    private readonly storeRepository: StoreRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(
    data: SearchStoreDto,
  ): Promise<FindAllResultEntity<StoreEntity>> {
    const cache =
      await this.cacheManager.get<FindAllResultEntity<StoreEntity> | null>(
        data.q ? `${data.q}_stores` : 'stores',
      );

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const stores = await this.storeRepository.findAll(query);
    const total = await this.storeRepository.count(query);

    const result: FindAllResultEntity<StoreEntity> = {
      data: stores,
      total,
      page: data.page,
      totalPage: Math.ceil(total / data.pageSize),
      pageSize: data.pageSize,
    };

    await this.cacheManager.set(data.q ? `${data.q}_stores` : 'stores', result);

    return result;
  }
}
