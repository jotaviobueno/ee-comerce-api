import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/domain/dtos';
import { CategoryEntity, QueryBuilderEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class CategoryRepository extends RepositoryFactory<
  CategoryEntity,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor() {
    super('category');
  }

  findAll(query: QueryBuilderEntity): Promise<CategoryEntity[]> {
    return this.prismaService.category.findMany(query);
  }

  findById(id: string): Promise<CategoryEntity | null> {
    return this.prismaService.category.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
