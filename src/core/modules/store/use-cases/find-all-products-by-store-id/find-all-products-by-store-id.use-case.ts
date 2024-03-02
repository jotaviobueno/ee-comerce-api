import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { FindAllResultEntity, ProductEntity } from 'src/domain/entities';
import { FindByIdStoreUseCase } from '../find-by-id';
import { FindAllProductByStoreIdUseCase } from 'src/core/modules/product/use-cases';

@Injectable()
export class FindAllProductsByStoreIdUseCase
  implements
    UseCaseBase<
      QueryParamsDto & { storeId: string },
      FindAllResultEntity<ProductEntity>
    >
{
  constructor(
    private readonly findByIdStoreUseCase: FindByIdStoreUseCase,
    private readonly findAllProductByStoreIdUseCase: FindAllProductByStoreIdUseCase,
  ) {}

  async execute({
    storeId,
    ...data
  }: QueryParamsDto & { storeId: string }): Promise<
    FindAllResultEntity<ProductEntity>
  > {
    const store = await this.findByIdStoreUseCase.execute(storeId);

    const products = await this.findAllProductByStoreIdUseCase.execute({
      ...data,
      storeId: store.id,
    });

    return products;
  }
}
