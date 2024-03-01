import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { SearchStoreDto } from 'src/domain/dtos';
import { StoreEntity } from 'src/domain/entities';
import { StoreRepository } from '../../store.repository';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class FindAllStoreUseCase
  implements UseCaseBase<SearchStoreDto, StoreEntity[]>
{
  constructor(
    private readonly storeRepository: StoreRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(data: SearchStoreDto): Promise<StoreEntity[]> {
    const cache = await this.cacheManager.get<StoreEntity[] | null>(
      `${data.q}_stores`,
    );

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const stores = await this.storeRepository.findAll(query);

    await this.cacheManager.set(`${data.q}_stores`, stores);

    return stores;
  }
}
