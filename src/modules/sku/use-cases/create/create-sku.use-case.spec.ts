import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import {
  colorMock,
  createSkuDtoMock,
  productMock,
  skuMock,
} from 'src/__mocks__';
import { CreateSkuUseCase } from './create-sku.use-case';
import { skuModuleMock } from '../../sku.module';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('CreateSkuUseCase', () => {
  let useCase: CreateSkuUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;
  let cache: Cache;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(skuModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<CreateSkuUseCase>(CreateSkuUseCase);
    cache = moduleRef.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be create with color id', async () => {
    jest.spyOn(cache, 'get').mockResolvedValue(null);

    jest.spyOn(cache, 'set').mockResolvedValue();

    jest
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValue(productMock);

    jest.spyOn(prismaService.color, 'findFirst').mockResolvedValue(colorMock);

    const create = jest
      .spyOn(prismaService.sku, 'create')
      .mockResolvedValue(skuMock);

    const response = await useCase.execute(createSkuDtoMock);

    expect(response).toStrictEqual(skuMock);
    expect(create).toHaveBeenCalledWith({
      data: {
        ...createSkuDtoMock,
        deletedAt: null,
      },
    });
  });
});
