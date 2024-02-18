import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { CategoryEntity } from 'src/domain/entities';
import { CategoryRepository } from '../../category.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { QueryBuilder } from 'src/domain/utils';

@Injectable()
export class FindAllCategoryUseCase
  implements UseCaseBase<QueryParamsDto, CategoryEntity[]>
{
  constructor(
    private readonly categoryRepository: CategoryRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(data: QueryParamsDto): Promise<CategoryEntity[]> {
    const cache = await this.cacheManager.get<CategoryEntity[] | null>(
      'categories',
    );

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const categories = await this.categoryRepository.findAll(query);

    if (categories.length > 0)
      await this.cacheManager.set('categories', categories);

    return categories;
  }
}
