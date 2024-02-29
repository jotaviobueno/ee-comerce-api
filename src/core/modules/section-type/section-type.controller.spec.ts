import { Test, TestingModule } from '@nestjs/testing';
import { SectionTypeController } from './section-type.controller';

describe('SectionTypeController', () => {
  let controller: SectionTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionTypeController],
    }).compile();

    controller = module.get<SectionTypeController>(SectionTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
