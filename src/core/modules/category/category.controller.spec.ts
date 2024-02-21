import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { categoryModuleMock } from './category.module';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(categoryModuleMock).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
