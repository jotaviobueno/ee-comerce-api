import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { queryParamsDtoMock, storeMock } from 'src/__mocks__';
import { FindAllStoreUseCase } from './find-all-store.use-case';
import { storeModuleMock } from '../../store.module';

describe('FindAllStoreUseCase', () => {
  let useCase: FindAllStoreUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(storeModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<FindAllStoreUseCase>(FindAllStoreUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be find All', async () => {
    const findAll = jest
      .spyOn(prismaService.store, 'findMany')
      .mockResolvedValue([storeMock]);

    const response = await useCase.execute(queryParamsDtoMock);

    expect(response).toStrictEqual([storeMock]);
    expect(findAll).toHaveBeenCalledWith({
      skip: 0,
      take: 200,
      where: {
        deletedAt: null,
      },
    });
  });
});
