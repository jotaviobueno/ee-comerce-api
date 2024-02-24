import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/domain/dtos';
import { ProductEntity, QueryBuilderEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/common/factories';

@Injectable()
export class ProductRepository extends RepositoryFactory<
  ProductEntity,
  CreateProductDto,
  UpdateProductDto
> {
  constructor() {
    super('product');
  }

  findById(id: string): Promise<ProductEntity | null> {
    return this.prismaService.product.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        productCategories: {
          include: {
            category: true,
          },
        },
        ratings: {
          where: {
            deletedAt: null,
          },
        },
        skus: {
          where: {
            deletedAt: null,
          },
          include: {
            color: true,
          },
        },
      },
    });
  }

  findAll(query: QueryBuilderEntity) {
    return this.prismaService.product.findMany({
      ...query,
      include: {
        productCategories: {
          include: {
            category: true,
          },
        },
        ratings: {
          where: {
            deletedAt: null,
          },
        },
        skus: {
          where: {
            deletedAt: null,
          },
          include: {
            color: true,
          },
        },
      },
    });
  }
}
