import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import {
  categoryMock,
  productCategoryMock,
  productMock,
  updateProductCategoryDtoMock,
} from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { UpdateProductCategoryUseCase } from './update-product-category.use-case';
import { productCategoryModuleMock } from '../../product-category.module';

describe('UpdateProductCategoryUseCase', () => {
  let useCase: UpdateProductCategoryUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      productCategoryModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<UpdateProductCategoryUseCase>(
      UpdateProductCategoryUseCase,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be update', async () => {
    jest
      .spyOn(prismaService.productCategory, 'findFirst')
      .mockResolvedValueOnce(productCategoryMock);

    jest
      .spyOn(prismaService.category, 'findFirst')
      .mockResolvedValueOnce(categoryMock);

    jest
      .spyOn(prismaService.productCategory, 'findFirst')
      .mockResolvedValueOnce(null);

    jest
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValueOnce(productMock);

    jest
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValueOnce(productMock);

    jest
      .spyOn(prismaService.productCategory, 'findFirst')
      .mockResolvedValueOnce(null);

    const update = jest
      .spyOn(prismaService.productCategory, 'update')
      .mockResolvedValueOnce(productCategoryMock);

    const response = await useCase.execute(updateProductCategoryDtoMock);

    expect(response).toStrictEqual(productCategoryMock);
    expect(update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: {
        categoryId: '1',
        productId: '1',
      },
    });
  });

  it('Should throw an error when product already have category', async () => {
    jest
      .spyOn(prismaService.productCategory, 'findFirst')
      .mockResolvedValueOnce(productCategoryMock);

    jest
      .spyOn(prismaService.category, 'findFirst')
      .mockResolvedValueOnce(categoryMock);

    jest
      .spyOn(prismaService.productCategory, 'findFirst')
      .mockResolvedValueOnce(productCategoryMock);

    const create = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute(updateProductCategoryDtoMock)).rejects.toThrow(
      HttpException,
    );

    expect(create).toHaveBeenCalledTimes(1);
  });

  it('Should throw an error when category already have product', async () => {
    jest
      .spyOn(prismaService.productCategory, 'findFirst')
      .mockResolvedValueOnce(productCategoryMock);

    jest
      .spyOn(prismaService.category, 'findFirst')
      .mockResolvedValueOnce(categoryMock);

    jest
      .spyOn(prismaService.productCategory, 'findFirst')
      .mockResolvedValueOnce(null);

    jest
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValueOnce(productMock);

    jest
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValueOnce(productMock);

    jest
      .spyOn(prismaService.productCategory, 'findFirst')
      .mockResolvedValueOnce(productCategoryMock);

    const create = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute(updateProductCategoryDtoMock)).rejects.toThrow(
      HttpException,
    );

    expect(create).toHaveBeenCalledTimes(1);
  });
});
