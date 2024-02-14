import { Test, TestingModule } from '@nestjs/testing';
import { StoreController } from './store.controller';
import { storeModuleMock } from './store.module';

describe('StoreController', () => {
  let controller: StoreController;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(storeModuleMock).compile();

    controller = module.get<StoreController>(StoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
