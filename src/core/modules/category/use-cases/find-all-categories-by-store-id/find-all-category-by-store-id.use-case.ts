import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { CategoryEntity } from 'src/domain/entities';
import { CategoryRepository } from '../../category.repository';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class FindAllCategoryByStoreIdUseCase
  implements
    UseCaseBase<QueryParamsDto & { storeId: string }, CategoryEntity[]>
{
  constructor(
    private readonly categoryRepository: CategoryRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute({
    storeId,
    ...data
  }: QueryParamsDto & { storeId: string }): Promise<CategoryEntity[]> {
    const cache = await this.cacheManager.get<CategoryEntity[] | null>(
      `${storeId}_categories`,
    );

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const categories = await this.categoryRepository.findAll({
      ...query,
      storeId: storeId,
    });

    await this.cacheManager.set(`${storeId}_categories`, categories);

    return categories;
  }
}
