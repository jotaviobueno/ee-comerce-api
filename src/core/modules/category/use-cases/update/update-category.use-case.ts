import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UpdateCategoryDto } from 'src/domain/dtos';
import { CategoryEntity } from 'src/domain/entities';
import { CategoryRepository } from '../../category.repository';
import { FindByIdCategoryUseCase } from '../find-by-id';

@Injectable()
export class UpdateCategoryUseCase
  implements UseCaseBase<UpdateCategoryDto, CategoryEntity>
{
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly findByIdCategoryUseCase: FindByIdCategoryUseCase,
  ) {}

  async execute(data: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.findByIdCategoryUseCase.execute(data.id);

    const update = await this.categoryRepository.update({
      ...data,
      id: category.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
