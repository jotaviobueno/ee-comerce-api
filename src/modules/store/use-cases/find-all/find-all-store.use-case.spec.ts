import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { queryParamsDtoMock, storeMock } from 'src/__mocks__';
import { FindAllStoreUseCase } from './find-all-store.use-case';
import { storeModuleMock } from '../../store.module';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('FindAllStoreUseCase', () => {
  let useCase: FindAllStoreUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;
  let cache: Cache;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(storeModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<FindAllStoreUseCase>(FindAllStoreUseCase);
    cache = moduleRef.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be find All', async () => {
    jest.spyOn(cache, 'get').mockResolvedValue(null);

    jest.spyOn(cache, 'set').mockResolvedValue();

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
