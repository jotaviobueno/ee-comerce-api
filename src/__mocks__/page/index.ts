import { CreatePageDto, UpdatePageDto } from 'src/domain/dtos';
import { PageEntity } from 'src/domain/entities';

export const pageMock: PageEntity = {
  id: '1',
  storeId: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
  name: '',
  description: '',
};

export const createPageDtoMock: CreatePageDto = {
  storeId: '1',
  title: '1',
  description: '1',
};

export const updatePageDtoMock: UpdatePageDto = {
  id: '1',
};
