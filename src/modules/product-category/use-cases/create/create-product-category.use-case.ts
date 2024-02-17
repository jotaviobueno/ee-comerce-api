import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { CreateProductCategoryDto } from 'src/domain/dtos';
import { ProductCategoryEntity } from 'src/domain/entities';
import { ProductCategoryRepository } from '../../product-category.repository';
import { FindByIdCategoryUseCase } from 'src/modules/category/use-cases';
import { FindByIdProductUseCase } from 'src/modules/product/use-cases';

@Injectable()
export class CreateProductCategoryUseCase
  implements UseCaseBase<CreateProductCategoryDto, ProductCategoryEntity>
{
  constructor(
    private readonly productCategoryRepository: ProductCategoryRepository,
    private readonly findByIdCategoryUseCase: FindByIdCategoryUseCase,
    private readonly findByIdProductUseCase: FindByIdProductUseCase,
  ) {}

  async execute(
    data: CreateProductCategoryDto,
  ): Promise<ProductCategoryEntity> {
    const product = await this.findByIdProductUseCase.execute(data.productId);

    const category = await this.findByIdCategoryUseCase.execute(
      data.categoryId,
    );

    const productAlreadyHaveThisCategory =
      await this.productCategoryRepository.findByCategoryIdAndProductId(
        category.id,
        product.id,
      );

    if (productAlreadyHaveThisCategory)
      throw new HttpException(
        'This product already have this category',
        HttpStatus.CONFLICT,
      );

    const productCategory = await this.productCategoryRepository.create(data);

    return productCategory;
  }
}
