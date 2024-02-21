import { Test, TestingModule } from '@nestjs/testing';
import { skuMock } from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { FindByIdSkuUseCase } from './find-by-id-sku.use-case';
import { skuModuleMock } from '../../sku.module';

describe('FindByIdSkuUseCase', () => {
  let useCase: FindByIdSkuUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(skuModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<FindByIdSkuUseCase>(FindByIdSkuUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be find by id', async () => {
    const findFirst = jest
      .spyOn(prismaService.sku, 'findFirst')
      .mockResolvedValue(skuMock);

    const response = await useCase.execute('1');

    expect(response).toStrictEqual(skuMock);
    expect(findFirst).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found sku', async () => {
    jest.spyOn(prismaService.sku, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
