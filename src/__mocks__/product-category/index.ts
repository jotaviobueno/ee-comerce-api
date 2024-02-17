import {
  CreateProductCategoryDto,
  UpdateProductCategoryDto,
} from 'src/domain/dtos';
import { ProductCategoryEntity } from 'src/domain/entities';

export const productCategoryMock: ProductCategoryEntity = {
  id: '1',
  categoryId: '1',
  productId: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

export const createProductCategoryDtoMock: CreateProductCategoryDto = {
  categoryId: '1',
  productId: '1',
};

export const updateProductCategoryDtoMock: UpdateProductCategoryDto = {
  id: '1',
  categoryId: '1',
  productId: '1',
};
