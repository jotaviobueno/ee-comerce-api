import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { SearchProductDto } from 'src/domain/dtos';
import { ProductRepository } from '../../product.repository';
import { QueryBuilder } from 'src/common/utils';
import { ProductEntity } from 'src/domain/entities';

@Injectable()
export class FindAllProductByStoreIdUseCase
  implements
    UseCaseBase<SearchProductDto & { storeId: string }, ProductEntity[]>
{
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    storeId,
    categoryId,
    q,
    brandId,
    ...data
  }: SearchProductDto & { storeId: string }): Promise<ProductEntity[]> {
    const query = new QueryBuilder(data)
      .where({
        storeId,
        productCategories: categoryId && {
          some: {
            categoryId,
            deletedAt: null,
          },
        },
        brand: brandId && {
          id: brandId,
          deletedAt: null,
        },
        name: q && {
          contains: q,
        },
      })
      .pagination()
      .handle();

    const products = await this.productRepository.findAll(query);

    return products;
  }
}
