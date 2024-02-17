import { Injectable } from '@nestjs/common';
import { CreateRatingDto, UpdateRatingDto } from 'src/domain/dtos';
import { RatingEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class RatingRepository extends RepositoryFactory<
  RatingEntity,
  CreateRatingDto,
  UpdateRatingDto
> {
  constructor() {
    super('rating');
  }

  findById(id: string): Promise<RatingEntity | null> {
    return this.prismaService.rating.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
