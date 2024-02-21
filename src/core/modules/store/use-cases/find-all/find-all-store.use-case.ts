import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { StoreEntity } from 'src/domain/entities';
import { StoreRepository } from '../../store.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class FindAllStoreUseCase
  implements UseCaseBase<QueryParamsDto, StoreEntity[]>
{
  constructor(
    private readonly storeRepository: StoreRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(data: QueryParamsDto): Promise<StoreEntity[]> {
    const cache = await this.cacheManager.get<StoreEntity[] | null>('stores');

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const stores = await this.storeRepository.findAll(query);

    await this.cacheManager.set('stores', stores);

    return stores;
  }
}
