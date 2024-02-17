import { CreateCategoryDto, UpdateCategoryDto } from 'src/domain/dtos';
import { CategoryEntity } from 'src/domain/entities';

export const categoryMock: CategoryEntity = {
  id: '1',
  name: 'name',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

export const createCategoryDtoMock: CreateCategoryDto = {
  name: 'name',
};

export const updateCategoryDtoMock: UpdateCategoryDto = {
  id: '1',
  name: 'name',
};
