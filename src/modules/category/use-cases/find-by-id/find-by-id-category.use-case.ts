import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { CategoryEntity } from 'src/domain/entities';
import { CategoryRepository } from '../../category.repository';

@Injectable()
export class FindByIdCategoryUseCase
  implements UseCaseBase<string, CategoryEntity>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(data: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findById(data);

    if (!category)
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);

    return category;
  }
}
