import { CreateSkuDto } from 'src/domain/dtos';
import { SkuEntity } from 'src/domain/entities';
import { SKU_SIZE_ENUM } from 'src/domain/enums';

export const skuMock: SkuEntity = {
  id: '1',
  width: 10,
  length: 10,
  height: 10,
  weight: 10,
  size: 'XXS',
  batch: '10a1-cjaA',
  productId: '1',
  colorId: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
  costPrice: 10,
  quantity: 50,
};

export const createSkuDtoMock: CreateSkuDto = {
  width: 10,
  length: 10,
  height: 10,
  weight: 10,
  colorId: '1',
  productId: '1',
  size: SKU_SIZE_ENUM.XXS,
  batch: '10a1-cjaA',
  costPrice: 10,
  quantity: 50,
};
