import { CreateColorDto, UpdateColorDto } from 'src/domain/dtos';
import { ColorEntity } from 'src/domain/entities';

export const colorMock: ColorEntity = {
  id: '1',
  name: 'name',
  hex: '#2213',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
  storeId: '1',
};

export const createColorDtoMock: CreateColorDto = {
  name: 'name',
  hex: '#fffff',
  storeId: '1',
};

export const updateColorDtoMock: UpdateColorDto = {
  id: '1',
  name: 'name',
};
