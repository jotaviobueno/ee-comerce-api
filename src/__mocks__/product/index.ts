import { CreateProductDto, UpdateProductDto } from 'src/domain/dtos';
import { ProductEntity } from 'src/domain/entities';

export const productMock: ProductEntity = {
  id: '1',
  name: 'name',
  description: 'description',
  images: [],
  brandId: '1',
  price: 10,
  storeId: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
  cost: 0,
  parentId: '',
  colorId: '',
  upc: '',
  ean: '',
  width: '',
  length: '',
  height: '',
  weight: '',
  size: '',
  isActive: false,
  stock: 0,
};

export const createProductDtoMock: CreateProductDto = {
  name: 'name',
  description: 'description',
  price: 20,
  storeId: '1',
  cost: 0,
  stock: 0,
};

export const updateProductDtoMock: UpdateProductDto = {
  id: '1',
  name: 'name',
};
