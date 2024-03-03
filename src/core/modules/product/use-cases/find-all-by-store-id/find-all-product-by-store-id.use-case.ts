import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { SearchProductDto } from 'src/domain/dtos';
import { ProductRepository } from '../../product.repository';
import { QueryBuilder } from 'src/common/utils';
import { FindAllResultEntity, ProductEntity } from 'src/domain/entities';

@Injectable()
export class FindAllProductByStoreIdUseCase
  implements
    UseCaseBase<
      SearchProductDto & { storeId: string },
      FindAllResultEntity<ProductEntity>
    >
{
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    storeId,
    categoryId,
    q,
    brandId,
    colorId,
    height,
    length,
    size,
    weight,
    width,
    ...data
  }: SearchProductDto & { storeId: string }): Promise<
    FindAllResultEntity<ProductEntity>
  > {
    const query = new QueryBuilder(data)
      .where({
        parentId: null,
        isActive: true,
        storeId,
        colorId,
        productCategories: categoryId && {
          some: {
            categoryId: {
              in: categoryId,
            },
            deletedAt: null,
          },
        },
        height: height && {
          equals: height,
        },
        length: length && {
          equals: length,
        },
        size: size && {
          equals: size,
        },
        weight: weight && {
          equals: weight,
        },
        width: width && {
          equals: width,
        },
        brand: brandId && {
          id: {
            in: brandId,
          },
          deletedAt: null,
        },

        name: q && {
          contains: q,
        },
        description: q && {
          contains: q,
        },
      })
      .pagination()
      .handle();

    const products = await this.productRepository.findAll(query);
    const total = await this.productRepository.count(query);

    const result: FindAllResultEntity<ProductEntity> = {
      data: products,
      total,
      page: data.page,
      totalPage: Math.ceil(total / data.pageSize),
      pageSize: data.pageSize,
    };

    return result;
  }
}
