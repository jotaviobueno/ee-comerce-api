import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CreateProductDto } from 'src/domain/dtos';
import { ProductEntity } from 'src/domain/entities';
import { ProductRepository } from '../../product.repository';
import { FindByIdStoreUseCase } from 'src/core/modules/store/use-cases';
import { FindByIdBrandUseCase } from 'src/core/modules/brand/use-cases';

@Injectable()
export class CreateProductUseCase
  implements UseCaseBase<CreateProductDto, ProductEntity>
{
  constructor(
    private readonly productRepository: ProductRepository,
    @Inject(forwardRef(() => FindByIdStoreUseCase))
    private readonly findByIdStoreUseCase: FindByIdStoreUseCase,
    private readonly findByIdBrandUseCase: FindByIdBrandUseCase,
  ) {}

  async execute(data: CreateProductDto): Promise<ProductEntity> {
    const store = await this.findByIdStoreUseCase.execute(data.storeId);

    if (data.brandId) await this.findByIdBrandUseCase.execute(data.brandId);

    const product = await this.productRepository.create({
      ...data,
      storeId: store.id,
    });

    return product;
  }
}
