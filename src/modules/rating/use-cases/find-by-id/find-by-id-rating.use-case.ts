import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { RatingEntity } from 'src/domain/entities';
import { RatingRepository } from '../../rating.repository';

@Injectable()
export class FindByIdRatingUseCase
  implements UseCaseBase<string, RatingEntity>
{
  constructor(private readonly ratingRepository: RatingRepository) {}

  async execute(data: string): Promise<RatingEntity> {
    const rating = await this.ratingRepository.findById(data);

    if (!rating)
      throw new HttpException('rating not found', HttpStatus.NOT_FOUND);

    return rating;
  }
}
