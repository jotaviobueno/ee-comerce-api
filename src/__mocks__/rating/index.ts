import { CreateRatingDto, UpdateRatingDto } from 'src/domain/dtos';
import { RatingEntity } from 'src/domain/entities';

export const ratingMock: RatingEntity = {
  id: '1',
  name: 'name',
  description: 'description',
  stars: 5,
  productId: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

export const createRatingDtoMock: CreateRatingDto = {
  name: 'name',
  description: 'description',
  stars: 5,
  productId: '1',
};

export const updateRatingDtoMock: UpdateRatingDto = {
  id: '1',
  name: 'name',
};
