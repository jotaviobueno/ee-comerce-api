import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { BrandEntity } from 'src/domain/entities';
import { BrandRepository } from '../../brand.repository';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class FindAllBrandUseCase
  implements UseCaseBase<QueryParamsDto, BrandEntity[]>
{
  constructor(
    private readonly brandRepository: BrandRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(data: QueryParamsDto): Promise<BrandEntity[]> {
    const cache = await this.cacheManager.get<BrandEntity[] | null>(`brands`);

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const brands = await this.brandRepository.findAll(query);

    await this.cacheManager.set(`brands`, brands);

    return brands;
  }
}
