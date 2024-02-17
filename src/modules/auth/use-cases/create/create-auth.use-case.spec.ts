import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { createUserDtoMock, userMock } from 'src/__mocks__';
import { CreateAuthUseCase } from './create-auth.use-case';
import { authModuleMock } from '../../auth.module';
import { JwtService } from '@nestjs/jwt';

jest.mock('bcrypt');

describe('CreateAuthUseCase', () => {
  let useCase: CreateAuthUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(authModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<CreateAuthUseCase>(CreateAuthUseCase);

    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be create', async () => {
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(userMock);

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);

    jest.spyOn(jwtService, 'sign').mockReturnValue('a');

    const response = await useCase.execute(createUserDtoMock);

    expect(response).toStrictEqual({ token: 'a' });
  });
});
