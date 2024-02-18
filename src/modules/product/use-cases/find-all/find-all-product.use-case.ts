import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { ProductRepository } from '../../product.repository';
import { QueryBuilder } from 'src/domain/utils';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ProductEntity } from 'src/domain/entities';

@Injectable()
export class FindAllProductUseCase
  implements UseCaseBase<QueryParamsDto, ProductEntity[]>
{
  constructor(
    private readonly productRepository: ProductRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(data: QueryParamsDto): Promise<ProductEntity[]> {
    const cache = await this.cacheManager.get<ProductEntity[] | null>(
      'products',
    );

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const products = await this.productRepository.findAll(query);

    if (products.length > 0) await this.cacheManager.set('products', products);

    return products;
  }
}
