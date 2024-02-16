import { Test, TestingModule } from '@nestjs/testing';
import { ColorController } from './color.controller';
import { colorModuleMock } from './color.module';

describe('ColorController', () => {
  let controller: ColorController;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(colorModuleMock).compile();

    controller = module.get<ColorController>(ColorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
