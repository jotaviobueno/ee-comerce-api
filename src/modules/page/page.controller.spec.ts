import { Test, TestingModule } from '@nestjs/testing';
import { PageController } from './page.controller';
import { pageModuleMock } from './page.module';

describe('PageController', () => {
  let controller: PageController;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(pageModuleMock).compile();

    controller = module.get<PageController>(PageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
