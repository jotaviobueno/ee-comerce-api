import { CreatePageDto, UpdatePageDto } from 'src/domain/dtos';
import { PageEntity } from 'src/domain/entities';

export const pageMock: PageEntity = {
  id: '1',
  images: [],
  storeId: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

export const createPageDtoMock: CreatePageDto = {
  storeId: '1',
};

export const updatePageDtoMock: UpdatePageDto = {
  id: '1',
};
