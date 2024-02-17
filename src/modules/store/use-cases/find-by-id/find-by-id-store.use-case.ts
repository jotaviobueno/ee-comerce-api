import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { StoreEntity } from 'src/domain/entities';
import { StoreRepository } from '../../store.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class FindByIdStoreUseCase implements UseCaseBase<string, StoreEntity> {
  constructor(
    private readonly storeRepository: StoreRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(data: string): Promise<StoreEntity> {
    const cache = await this.cacheManager.get<StoreEntity | null>(data);

    if (cache) return cache;

    const store = await this.storeRepository.findById(data);

    if (!store)
      throw new HttpException('Store not found.', HttpStatus.NOT_FOUND);

    await this.cacheManager.set(data, store);

    return store;
  }
}
