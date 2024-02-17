import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryController } from './product-category.controller';
import { productCategoryModuleMock } from './product-category.module';

describe('ProductCategoryController', () => {
  let controller: ProductCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      productCategoryModuleMock,
    ).compile();

    controller = module.get<ProductCategoryController>(
      ProductCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
