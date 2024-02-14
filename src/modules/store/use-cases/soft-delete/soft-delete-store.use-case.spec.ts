import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { HttpException } from '@nestjs/common';
import { SoftDeleteStoreUseCase } from './soft-delete-store.use-case';
import { storeModuleMock } from '../../store.module';
import { storeMock } from 'src/__mocks__';

describe('SoftDeleteStoreUseCase', () => {
  let useCase: SoftDeleteStoreUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(storeModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<SoftDeleteStoreUseCase>(SoftDeleteStoreUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be remove', async () => {
    jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(storeMock);

    const remove = jest
      .spyOn(prismaService.store, 'update')
      .mockResolvedValue(storeMock);

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
    jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(storeMock);

    jest.spyOn(prismaService.store, 'update').mockResolvedValue(null);

    const remove = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute('1')).rejects.toThrow(HttpException);

    expect(remove).toHaveBeenCalledTimes(1);
  });
});
