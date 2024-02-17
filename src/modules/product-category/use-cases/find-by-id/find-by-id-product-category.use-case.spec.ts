import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { FindByIdProductCategoryUseCase } from './find-by-id-product-category.use-case';
import { productCategoryModuleMock } from '../../product-category.module';
import { productCategoryMock } from 'src/__mocks__';

describe('FindByIdProductCategoryUseCase', () => {
  let useCase: FindByIdProductCategoryUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      productCategoryModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<FindByIdProductCategoryUseCase>(
      FindByIdProductCategoryUseCase,
    );
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
      .spyOn(prismaService.productCategory, 'findFirst')
      .mockResolvedValue(productCategoryMock);

    const response = await useCase.execute('1');

    expect(response).toStrictEqual(productCategoryMock);
    expect(findFirst).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found product category', async () => {
    jest
      .spyOn(prismaService.productCategory, 'findFirst')
      .mockResolvedValue(null);

    const spyFind = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
