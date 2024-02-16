import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { UpdateProductDto } from 'src/domain/dtos';
import { ProductEntity } from 'src/domain/entities';
import { ProductRepository } from '../../product.repository';
import { FindByIdProductUseCase } from '../find-by-id';

@Injectable()
export class UpdateProductUseCase
  implements UseCaseBase<UpdateProductDto, ProductEntity>
{
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly findByIdProductUseCase: FindByIdProductUseCase,
  ) {}

  async execute(data: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findByIdProductUseCase.execute(data.id);

    const update = await this.productRepository.update({
      ...data,
      id: product.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
