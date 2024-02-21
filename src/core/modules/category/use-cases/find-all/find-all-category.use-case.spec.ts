import { Test, TestingModule } from '@nestjs/testing';
import { categoryMock, queryParamsDtoMock } from 'src/__mocks__';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { FindAllCategoryUseCase } from './find-all-category.use-case';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { categoryModuleMock } from '../../category.module';

describe('FindAllCategoryUseCase', () => {
  let useCase: FindAllCategoryUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;
  let cache: Cache;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(categoryModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<FindAllCategoryUseCase>(FindAllCategoryUseCase);
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
      .spyOn(prismaService.category, 'findMany')
      .mockResolvedValue([categoryMock]);

    const response = await useCase.execute(queryParamsDtoMock);

    expect(response).toStrictEqual([categoryMock]);
    expect(findAll).toHaveBeenCalledWith({
      skip: 0,
      take: 200,
      where: {
        deletedAt: null,
      },
    });
  });
});
