import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CreateProductDto } from 'src/domain/dtos';
import { ProductEntity } from 'src/domain/entities';
import { ProductRepository } from '../../product.repository';
import { FindByIdStoreUseCase } from 'src/core/modules/store/use-cases';

@Injectable()
export class CreateProductUseCase
  implements UseCaseBase<CreateProductDto, ProductEntity>
{
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly findByIdStoreUseCase: FindByIdStoreUseCase,
  ) {}

  async execute(data: CreateProductDto): Promise<ProductEntity> {
    const store = await this.findByIdStoreUseCase.execute(data.storeId);

    const product = await this.productRepository.create({
      ...data,
      storeId: store.id,
    });

    return product;
  }
}
