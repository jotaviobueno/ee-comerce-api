import { Test, TestingModule } from '@nestjs/testing';
import { SkuController } from './sku.controller';
import { skuModuleMock } from './sku.module';

describe('SkuController', () => {
  let controller: SkuController;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(skuModuleMock).compile();

    controller = module.get<SkuController>(SkuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
