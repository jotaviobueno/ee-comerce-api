import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { ProductRepository } from '../../product.repository';
import { QueryBuilder } from 'src/common/utils';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ProductEntity } from 'src/domain/entities';
import { FindByIdStoreUseCase } from 'src/core/modules/store/use-cases';

@Injectable()
export class FindAllProductByStoreIdUseCase
  implements UseCaseBase<QueryParamsDto & { storeId: string }, ProductEntity[]>
{
  constructor(
    private readonly findByIdStoreUseCase: FindByIdStoreUseCase,
    private readonly productRepository: ProductRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute({
    storeId,
    ...data
  }: QueryParamsDto & { storeId: string }): Promise<ProductEntity[]> {
    const store = await this.findByIdStoreUseCase.execute(storeId);

    const cache = await this.cacheManager.get<ProductEntity[] | null>(
      `products_${store.id}`,
    );

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const products = await this.productRepository.findAll({
      ...query,
      storeId: store.id,
    });

    await this.cacheManager.set(`products_${store.id}`, products);

    return products;
  }
}
