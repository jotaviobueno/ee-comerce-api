import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { CreateRatingDto } from 'src/domain/dtos';
import { RatingEntity } from 'src/domain/entities';
import { RatingRepository } from '../../rating.repository';
import { FindByIdProductUseCase } from 'src/modules/product/use-cases';

@Injectable()
export class CreateRatingUseCase
  implements UseCaseBase<CreateRatingDto, RatingEntity>
{
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly findByIdProductUseCase: FindByIdProductUseCase,
  ) {}

  async execute(data: CreateRatingDto): Promise<RatingEntity> {
    const product = await this.findByIdProductUseCase.execute(data.productId);

    const rating = await this.ratingRepository.create({
      ...data,
      productId: product.id,
    });

    return rating;
  }
}
