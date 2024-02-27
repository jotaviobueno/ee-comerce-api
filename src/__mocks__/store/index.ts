import { CreateStoreDto, UpdateStoreDto } from 'src/domain/dtos';
import { StoreEntity } from 'src/domain/entities';

export const storeMock: StoreEntity = {
  id: '1',
  name: 'name',
  companyId: '1',
  logo: 'https://ethereal-menu.s3.us-east-2.amazonaws.com/default/user/0d9cf5a5-5288-4f12-9c46-11795dc9d09c.jpeg',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

export const createStoreDtoMock: CreateStoreDto = {
  name: 'name',
  companyId: '1',
};

export const updateStoreDtoMock: UpdateStoreDto = {
  id: '1',
  name: 'name',
};
