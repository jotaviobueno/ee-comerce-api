import { CreateProductDto, UpdateProductDto } from 'src/domain/dtos';
import { ProductEntity } from 'src/domain/entities';

export const productMock: ProductEntity = {
  id: '1',
  name: 'name',
  description: 'description',
  images: [],
  price: 20,
  storeId: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

export const createProductDtoMock: CreateProductDto = {
  name: 'name',
  description: 'description',
  price: 20,
  storeId: '1',
};

export const updateProductDtoMock: UpdateProductDto = {
  id: '1',
  name: 'name',
};
