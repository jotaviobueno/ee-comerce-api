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
        isActive: true,
        deletedAt: null,
      },
      include: {
        brand: true,
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
        children: {
          where: {
            isActive: true,
            deletedAt: null,
          },
          include: {
            brand: true,
          },
        },
      },
    });
  }

  findAll(query: QueryBuilderEntity) {
    return this.prismaService.product.findMany({
      ...query,
      include: {
        brand: true,
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
        children: {
          include: {
            brand: true,
          },
        },
      },
    });
  }
}
