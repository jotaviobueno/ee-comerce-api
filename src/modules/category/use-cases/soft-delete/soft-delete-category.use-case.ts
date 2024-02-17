import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { CategoryRepository } from '../../category.repository';
import { FindByIdCategoryUseCase } from '../find-by-id';

@Injectable()
export class SoftDeleteCategoryUseCase implements UseCaseBase<string, boolean> {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly findByIdCategoryUseCase: FindByIdCategoryUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const category = await this.findByIdCategoryUseCase.execute(data);

    const remove = await this.categoryRepository.softDelete(category.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
