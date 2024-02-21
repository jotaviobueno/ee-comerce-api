import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CreateCategoryDto } from 'src/domain/dtos';
import { CategoryEntity } from 'src/domain/entities';
import { CategoryRepository } from '../../category.repository';

@Injectable()
export class CreateCategoryUseCase
  implements UseCaseBase<CreateCategoryDto, CategoryEntity>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(data: CreateCategoryDto): Promise<CategoryEntity> {
    const category = await this.categoryRepository.create(data);

    return category;
  }
}
