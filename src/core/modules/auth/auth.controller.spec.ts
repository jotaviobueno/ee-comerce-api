import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { authModuleMock } from './auth.module';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(authModuleMock).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
