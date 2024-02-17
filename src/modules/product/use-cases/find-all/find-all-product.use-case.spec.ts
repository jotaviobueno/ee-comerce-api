import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { productMock, queryParamsDtoMock } from 'src/__mocks__';
import { productModuleMock } from '../../product.module';
import { FindAllProductUseCase } from './find-all-product.use-case';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('FindAllProductUseCase', () => {
  let useCase: FindAllProductUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;
  let cache: Cache;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(productModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<FindAllProductUseCase>(FindAllProductUseCase);
    cache = moduleRef.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be findAll', async () => {
    jest.spyOn(cache, 'get').mockResolvedValue(null);

    jest.spyOn(cache, 'set').mockResolvedValue();

    const findAll = jest
      .spyOn(prismaService.product, 'findMany')
      .mockResolvedValue([productMock]);

    const response = await useCase.execute(queryParamsDtoMock);

    expect(response).toStrictEqual([productMock]);
    expect(findAll).toHaveBeenCalledWith({
      skip: 0,
      take: 200,
      where: {
        deletedAt: null,
      },
      include: {
        productCategories: {
          include: {
            category: true,
          },
        },
        ratings: {
          where: {
            deletedAt: null,
          },
        },
        skus: {
          where: {
            deletedAt: null,
          },
          include: {
            color: true,
          },
        },
      },
    });
  });
});
