import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { CategoryEntity, FindAllResultEntity } from 'src/domain/entities';
import { FindByIdStoreUseCase } from '../find-by-id';
import { FindAllCategoryByStoreIdUseCase } from 'src/core/modules/category/use-cases';

@Injectable()
export class FindAllCategoriesByStoreIdUseCase
  implements
    UseCaseBase<
      QueryParamsDto & { storeId: string },
      FindAllResultEntity<CategoryEntity>
    >
{
  constructor(
    private readonly findByIdStoreUseCase: FindByIdStoreUseCase,
    private readonly findAllCategoryByStoreIdUseCase: FindAllCategoryByStoreIdUseCase,
  ) {}

  async execute({
    storeId,
    ...data
  }: QueryParamsDto & { storeId: string }): Promise<
    FindAllResultEntity<CategoryEntity>
  > {
    const store = await this.findByIdStoreUseCase.execute(storeId);

    const categories = await this.findAllCategoryByStoreIdUseCase.execute({
      ...data,
      storeId: store.id,
    });

    return categories;
  }
}
