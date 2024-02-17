import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { RatingRepository } from '../../rating.repository';
import { FindByIdRatingUseCase } from '../find-by-id';

@Injectable()
export class SoftDeleteRatingUseCase implements UseCaseBase<string, boolean> {
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly findByIdRatingUseCase: FindByIdRatingUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const rating = await this.findByIdRatingUseCase.execute(data);

    const remove = await this.ratingRepository.softDelete(rating.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
