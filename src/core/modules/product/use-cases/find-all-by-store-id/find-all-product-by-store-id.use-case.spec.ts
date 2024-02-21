import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { productMock, queryParamsDtoMock, storeMock } from 'src/__mocks__';
import { productModuleMock } from '../../product.module';
import { FindAllProductByStoreIdUseCase } from './find-all-product-by-store-id.use-case';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('FindAllProductByStoreIdUseCase', () => {
  let useCase: FindAllProductByStoreIdUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;
  let cache: Cache;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(productModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<FindAllProductByStoreIdUseCase>(
      FindAllProductByStoreIdUseCase,
    );
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
    jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(storeMock);

    jest.spyOn(cache, 'get').mockResolvedValue(null);

    jest.spyOn(cache, 'set').mockResolvedValue();

    const findAll = jest
      .spyOn(prismaService.product, 'findMany')
      .mockResolvedValue([productMock]);

    const response = await useCase.execute({
      ...queryParamsDtoMock,
      storeId: '1',
    });

    expect(response).toStrictEqual([productMock]);
    expect(findAll).toHaveBeenCalledWith({
      skip: 0,
      take: 200,
      where: {
        storeId: '1',
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
