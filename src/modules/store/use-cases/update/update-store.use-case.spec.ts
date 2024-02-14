import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { storeMock, updateStoreDtoMock } from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { UpdateStoreUseCase } from './update-store.use-case';
import { storeModuleMock } from '../../store.module';

describe('UpdateStoreUseCase', () => {
  let useCase: UpdateStoreUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(storeModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<UpdateStoreUseCase>(UpdateStoreUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be update', async () => {
    jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(storeMock);

    const update = jest
      .spyOn(prismaService.store, 'update')
      .mockResolvedValue(storeMock);

    const response = await useCase.execute(updateStoreDtoMock);

    expect(response).toStrictEqual(storeMock);
    expect(update).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        name: 'name',
      },
    });
  });

  it('Should throw an error when failed to update', async () => {
    jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(storeMock);

    jest.spyOn(prismaService.store, 'update').mockResolvedValue(null);

    const update = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute(updateStoreDtoMock)).rejects.toThrow(
      HttpException,
    );

    expect(update).toHaveBeenCalledTimes(1);
  });
});
