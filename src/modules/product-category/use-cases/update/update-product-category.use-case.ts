import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { UpdateProductCategoryDto } from 'src/domain/dtos';
import { ProductCategoryEntity } from 'src/domain/entities';
import { ProductCategoryRepository } from '../../product-category.repository';
import { FindByIdProductCategoryUseCase } from '../find-by-id';
import { FindByIdCategoryUseCase } from 'src/modules/category/use-cases';
import { FindByIdProductUseCase } from 'src/modules/product/use-cases';

@Injectable()
export class UpdateProductCategoryUseCase
  implements UseCaseBase<UpdateProductCategoryDto, ProductCategoryEntity>
{
  constructor(
    private readonly productCategoryRepository: ProductCategoryRepository,
    private readonly findByIdProductCategoryUseCase: FindByIdProductCategoryUseCase,
    private readonly findByIdCategoryUseCase: FindByIdCategoryUseCase,
    private readonly findByIdProductUseCase: FindByIdProductUseCase,
  ) {}

  async execute(
    data: UpdateProductCategoryDto,
  ): Promise<ProductCategoryEntity> {
    const productCategory = await this.findByIdProductCategoryUseCase.execute(
      data.id,
    );

    if (data.categoryId) {
      const category = await this.findByIdCategoryUseCase.execute(
        data.categoryId,
      );

      const categoryAlreadyHaveThisProduct =
        await this.productCategoryRepository.findByCategoryIdAndProductId(
          category.id,
          productCategory.productId,
        );

      if (categoryAlreadyHaveThisProduct)
        throw new HttpException(
          'This category already exist in product',
          HttpStatus.CONFLICT,
        );
    }

    if (data.productId) {
      const product = await this.findByIdProductUseCase.execute(data.productId);

      const productAlreadyHaveThisCategory =
        await this.productCategoryRepository.findByCategoryIdAndProductId(
          productCategory.categoryId,
          product.id,
        );

      if (productAlreadyHaveThisCategory)
        throw new HttpException(
          'This product already exist this category',
          HttpStatus.CONFLICT,
        );
    }

    const update = await this.productCategoryRepository.update({
      ...data,
      id: productCategory.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
