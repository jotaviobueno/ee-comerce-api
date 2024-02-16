import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { ProductRepository } from '../../product.repository';
import { FindByIdProductUseCase } from '../find-by-id';

@Injectable()
export class SoftDeleteProductUseCase implements UseCaseBase<string, boolean> {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly findByIdProductUseCase: FindByIdProductUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const product = await this.findByIdProductUseCase.execute(data);

    const remove = await this.productRepository.softDelete(product.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
