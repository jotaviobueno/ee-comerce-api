import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { BrandEntity, FindAllResultEntity } from 'src/domain/entities';
import { BrandRepository } from '../../brand.repository';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class FindAllBrandByStoreIdUseCase
  implements UseCaseBase<QueryParamsDto, FindAllResultEntity<BrandEntity>>
{
  constructor(
    private readonly brandRepository: BrandRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute({
    storeId,
    ...data
  }: QueryParamsDto & { storeId: string }): Promise<
    FindAllResultEntity<BrandEntity>
  > {
    const cache =
      await this.cacheManager.get<FindAllResultEntity<BrandEntity> | null>(
        `${storeId}_brands`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(data)
      .where({ storeId })
      .pagination()
      .handle();

    const brands = await this.brandRepository.findAll(query);
    const total = await this.brandRepository.count(query);

    const result: FindAllResultEntity<BrandEntity> = {
      data: brands,
      total,
      page: data.page,
      totalPage: Math.ceil(total / data.pageSize),
      pageSize: data.pageSize,
    };

    await this.cacheManager.set(`${storeId}_brands`, result);

    return result;
  }
}
