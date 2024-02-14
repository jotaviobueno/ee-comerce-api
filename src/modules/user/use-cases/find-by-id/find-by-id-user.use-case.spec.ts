import { Test, TestingModule } from '@nestjs/testing';
import { userModuleMock } from '../../user.module';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { userMock } from 'src/__mocks__';
import { FindByIdUserUseCase } from './find-by-id-user.use-case';
import { HttpException } from '@nestjs/common';

describe('FindByIdUserUseCase', () => {
  let useCase: FindByIdUserUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(userModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<FindByIdUserUseCase>(FindByIdUserUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be find by id', async () => {
    const findFirst = jest
      .spyOn(prismaService.user, 'findFirst')
      .mockResolvedValue(userMock);

    const response = await useCase.execute('1');

    expect(response).toStrictEqual(userMock);
    expect(findFirst).toHaveBeenCalledWith({
      where: {
        id: '1',
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

  it('Should throw an error when not found user', async () => {
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
