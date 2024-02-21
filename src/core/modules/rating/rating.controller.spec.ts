import { Test, TestingModule } from '@nestjs/testing';
import { RatingController } from './rating.controller';
import { ratingModuleMock } from './rating.module';

describe('RatingController', () => {
  let controller: RatingController;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(ratingModuleMock).compile();

    controller = module.get<RatingController>(RatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
