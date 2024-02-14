import { Test, TestingModule } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import { userModuleMock } from '../../user.module';
import { CreateUserUseCase } from './create-user.use-case';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { createUserDtoMock, userMock } from 'src/__mocks__';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(userModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be create', async () => {
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation((_pass, _salt, cb) => cb(null, 'abc123'));

    const create = jest
      .spyOn(prismaService.user, 'create')
      .mockResolvedValue(userMock);

    const response = await useCase.execute(createUserDtoMock);

    expect(response).toStrictEqual(userMock);
    expect(create).toHaveBeenCalledWith({
      data: {
        ...createUserDtoMock,
        deletedAt: null,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  });
});
