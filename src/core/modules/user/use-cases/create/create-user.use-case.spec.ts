import { Test, TestingModule } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import { userModuleMock } from '../../user.module';
import { CreateUserUseCase } from './create-user.use-case';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { createUserDtoMock, userMock } from 'src/__mocks__';
import { HttpException } from '@nestjs/common';

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

  it('Should throw an error when already exist email', async () => {
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValueOnce(userMock);

    const create = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute(createUserDtoMock)).rejects.toThrow(
      HttpException,
    );

    expect(create).toHaveBeenCalledTimes(1);
  });

  it('Should throw an error when already exist username', async () => {
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValueOnce(null);

    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValueOnce(userMock);

    const create = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute(createUserDtoMock)).rejects.toThrow(
      HttpException,
    );

    expect(create).toHaveBeenCalledTimes(1);
  });
});
