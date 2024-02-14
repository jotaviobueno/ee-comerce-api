import { CreateUserDto, UpdateUserDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';

export const userMock: UserEntity = {
  id: '1',
  firstName: 'firstName',
  lastName: 'lastName',
  username: 'username',
  avatar:
    'https://ethereal-menu.s3.us-east-2.amazonaws.com/default/user/0d9cf5a5-5288-4f12-9c46-11795dc9d09c.jpeg',
  email: 'email@email.com',
  password: 'abc123',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

export const createUserDtoMock: CreateUserDto = {
  firstName: 'firstName',
  lastName: 'lastName',
  username: 'username',
  email: 'email@email.com',
  password: 'abc123',
};

export const updateUserDtoMock: UpdateUserDto = {
  id: '1',
  firstName: 'firstName',
};
