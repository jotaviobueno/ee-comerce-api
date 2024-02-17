import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { ProductCategoryEntity } from 'src/domain/entities';
import { ProductCategoryRepository } from '../../product-category.repository';

@Injectable()
export class FindByIdProductCategoryUseCase
  implements UseCaseBase<string, ProductCategoryEntity>
{
  constructor(
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async execute(data: string): Promise<ProductCategoryEntity> {
    const productCategory = await this.productCategoryRepository.findById(data);

    if (!productCategory)
      throw new HttpException(
        'Product category not found',
        HttpStatus.NOT_FOUND,
      );

    return productCategory;
  }
}
