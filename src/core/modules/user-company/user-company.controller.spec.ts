import { Test, TestingModule } from '@nestjs/testing';
import { UserCompanyController } from './user-company.controller';

describe('UserCompanyController', () => {
  let controller: UserCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCompanyController],
    }).compile();

    controller = module.get<UserCompanyController>(UserCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
