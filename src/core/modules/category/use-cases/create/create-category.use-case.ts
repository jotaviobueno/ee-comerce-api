import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CreateCategoryDto } from 'src/domain/dtos';
import { CategoryEntity } from 'src/domain/entities';
import { CategoryRepository } from '../../category.repository';
import { FindByIdStoreUseCase } from 'src/core/modules/store/use-cases';

@Injectable()
export class CreateCategoryUseCase
  implements UseCaseBase<CreateCategoryDto, CategoryEntity>
{
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly findByIdStoreUseCase: FindByIdStoreUseCase,
  ) {}

  async execute(data: CreateCategoryDto): Promise<CategoryEntity> {
    const store = await this.findByIdStoreUseCase.execute(data.storeId);

    const category = await this.categoryRepository.create({
      ...data,
      storeId: store.id,
    });

    return category;
  }
}
