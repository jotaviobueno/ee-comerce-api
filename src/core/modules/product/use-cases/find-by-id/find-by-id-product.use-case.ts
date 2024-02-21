import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { ProductEntity } from 'src/domain/entities';
import { ProductRepository } from '../../product.repository';

@Injectable()
export class FindByIdProductUseCase
  implements UseCaseBase<string, ProductEntity>
{
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: string): Promise<ProductEntity> {
    const product = await this.productRepository.findById(data);

    if (!product)
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);

    return product;
  }
}
