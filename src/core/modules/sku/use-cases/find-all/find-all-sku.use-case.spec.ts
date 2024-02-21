import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { queryParamsDtoMock, skuMock } from 'src/__mocks__';
import { FindAllSkuUseCase } from './find-all-sku.use-case';
import { skuModuleMock } from '../../sku.module';

describe('FindAllSkuUseCase', () => {
  let useCase: FindAllSkuUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(skuModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<FindAllSkuUseCase>(FindAllSkuUseCase);
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
      .spyOn(prismaService.sku, 'findMany')
      .mockResolvedValue([skuMock]);

    const response = await useCase.execute(queryParamsDtoMock);

    expect(response).toStrictEqual([skuMock]);
    expect(findAll).toHaveBeenCalledWith({
      skip: 0,
      take: 200,
      where: {
        deletedAt: null,
      },
    });
  });
});
