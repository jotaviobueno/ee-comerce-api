import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { UpdateRatingDto } from 'src/domain/dtos';
import { RatingEntity } from 'src/domain/entities';
import { RatingRepository } from '../../rating.repository';
import { FindByIdRatingUseCase } from '../find-by-id';

@Injectable()
export class UpdateRatingUseCase
  implements UseCaseBase<UpdateRatingDto, RatingEntity>
{
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly findByIdRatingUseCase: FindByIdRatingUseCase,
  ) {}

  async execute(data: UpdateRatingDto): Promise<RatingEntity> {
    const rating = await this.findByIdRatingUseCase.execute(data.id);

    const update = await this.ratingRepository.update({
      ...data,
      id: rating.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
