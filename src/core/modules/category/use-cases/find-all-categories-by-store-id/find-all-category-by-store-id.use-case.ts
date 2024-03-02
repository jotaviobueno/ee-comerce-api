import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { CategoryEntity, FindAllResultEntity } from 'src/domain/entities';
import { CategoryRepository } from '../../category.repository';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class FindAllCategoryByStoreIdUseCase
  implements
    UseCaseBase<
      QueryParamsDto & { storeId: string },
      FindAllResultEntity<CategoryEntity>
    >
{
  constructor(
    private readonly categoryRepository: CategoryRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute({
    storeId,
    ...data
  }: QueryParamsDto & { storeId: string }): Promise<
    FindAllResultEntity<CategoryEntity>
  > {
    const cache =
      await this.cacheManager.get<FindAllResultEntity<CategoryEntity> | null>(
        `${storeId}_categories`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const categories = await this.categoryRepository.findAll({
      ...query,
      storeId: storeId,
    });

    const total = await this.categoryRepository.count(query);

    const result: FindAllResultEntity<CategoryEntity> = {
      data: categories,
      total,
      page: data.page,
      totalPage: Math.ceil(total / data.pageSize),
      pageSize: data.pageSize,
    };

    await this.cacheManager.set(`${storeId}_categories`, result);

    return result;
  }
}
