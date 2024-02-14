import { Test, TestingModule } from '@nestjs/testing';
import { userModuleMock } from '../../user.module';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { userMock } from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { SoftDeleteUserUseCase } from './soft-delete-user.use-case';

describe('SoftDeleteUserUseCase', () => {
  let useCase: SoftDeleteUserUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(userModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<SoftDeleteUserUseCase>(SoftDeleteUserUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be remove', async () => {
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(userMock);

    const remove = jest
      .spyOn(prismaService.user, 'update')
      .mockResolvedValue(userMock);

    const response = await useCase.execute('1');

    expect(response).toStrictEqual(true);
    expect(remove).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        deletedAt: expect.any(Date),
      },
    });
  });

  it('Should throw an error when failed to remove', async () => {
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(userMock);

    jest.spyOn(prismaService.user, 'update').mockResolvedValue(null);

    const remove = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute('1')).rejects.toThrow(HttpException);

    expect(remove).toHaveBeenCalledTimes(1);
  });
});
