import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingRepository } from './rating.repository';
import {
  CreateRatingUseCase,
  FindByIdRatingUseCase,
  SoftDeleteRatingUseCase,
  UpdateRatingUseCase,
} from './use-cases';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { ProductModule } from '../product/product.module';

export const ratingModuleMock = {
  imports: [PrismaModule, ProductModule],
  controllers: [RatingController],
  providers: [
    RatingRepository,
    CreateRatingUseCase,
    FindByIdRatingUseCase,
    UpdateRatingUseCase,
    SoftDeleteRatingUseCase,
  ],
  exports: [FindByIdRatingUseCase],
};

@Module(ratingModuleMock)
export class RatingModule {}
