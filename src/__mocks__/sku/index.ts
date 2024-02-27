import { CreateSkuDto, UpdateSkuDto } from 'src/domain/dtos';
import { SkuEntity } from 'src/domain/entities';

export const skuMock: SkuEntity = {
  id: '1',

  productId: '1',
  colorId: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
  quantity: 50,
  width: '1',
  length: '1',
  height: '1',
  weight: '1',
  costPrice: 10,
  price: 10,
  upc: '1',
  ean: '1',
  isActive: false,
  documents: [],
};

export const createSkuDtoMock: CreateSkuDto = {
  colorId: '1',
  productId: '1',
  costPrice: 10,
  quantity: 50,
  width: '1',
  length: '1',
  height: '1',
  weight: '1',
  price: 0,
  upc: '1',
  ean: '1',
  isActive: false,
};

export const updateSkuDtoMock: UpdateSkuDto = {
  id: '1',
  colorId: '1',
  quantity: 10,
};
