import { Injectable } from '@nestjs/common';
import {
  CreateProductCategoryDto,
  UpdateProductCategoryDto,
} from 'src/domain/dtos';
import { ProductCategoryEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/common/factories';

@Injectable()
export class ProductCategoryRepository extends RepositoryFactory<
  ProductCategoryEntity,
  CreateProductCategoryDto,
  UpdateProductCategoryDto
> {
  constructor() {
    super('productCategory');
  }

  findByCategoryIdAndProductId(
    categoryId: string,
    productId: string,
  ): Promise<ProductCategoryEntity | null> {
    return this.prismaService.productCategory.findFirst({
      where: {
        productId,
        categoryId,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<ProductCategoryEntity | null> {
    return this.prismaService.productCategory.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
