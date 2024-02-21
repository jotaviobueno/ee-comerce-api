import { Test, TestingModule } from '@nestjs/testing';
import { userModuleMock } from '../../user.module';
import { userMock } from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { FindByEmailUserUseCase } from './find-by-email-user.use-case';

describe('FindByEmailUserUseCase', () => {
  let useCase: FindByEmailUserUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(userModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<FindByEmailUserUseCase>(FindByEmailUserUseCase);
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

    const response = await useCase.execute('email@email.com');

    expect(response).toStrictEqual(userMock);
    expect(findFirst).toHaveBeenCalledWith({
      where: {
        email: 'email@email.com',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found user', async () => {
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute('email@email.com')).rejects.toThrow(
      HttpException,
    );

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
