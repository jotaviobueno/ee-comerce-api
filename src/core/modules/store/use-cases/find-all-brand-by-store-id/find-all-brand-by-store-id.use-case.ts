import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { SearchBrandDto } from 'src/domain/dtos';
import { BrandEntity, FindAllResultEntity } from 'src/domain/entities';
import { FindByIdStoreUseCase } from '../find-by-id';
import { FindAllBrandByStoreIdUseCase } from 'src/core/modules/brand/use-cases';

@Injectable()
export class FindAllBrandsByStoreIdUseCase
  implements UseCaseBase<SearchBrandDto, FindAllResultEntity<BrandEntity>>
{
  constructor(
    private readonly findByIdStoreUseCase: FindByIdStoreUseCase,
    private readonly findAllBrandByStoreIdUseCase: FindAllBrandByStoreIdUseCase,
  ) {}

  async execute({
    storeId,
    ...data
  }: SearchBrandDto): Promise<FindAllResultEntity<BrandEntity>> {
    const store = await this.findByIdStoreUseCase.execute(storeId);

    const brands = await this.findAllBrandByStoreIdUseCase.execute({
      ...data,
      storeId: store.id,
    });

    return brands;
  }
}
