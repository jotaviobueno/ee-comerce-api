import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import {
  categoryMock,
  createProductCategoryDtoMock,
  productCategoryMock,
  productMock,
} from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { CreateProductCategoryUseCase } from './create-product-category.use-case';
import { productCategoryModuleMock } from '../../product-category.module';

describe('CreateProductCategoryUseCase', () => {
  let useCase: CreateProductCategoryUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      productCategoryModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<CreateProductCategoryUseCase>(
      CreateProductCategoryUseCase,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be create', async () => {
    jest
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValueOnce(productMock);

    jest
      .spyOn(prismaService.category, 'findFirst')
      .mockResolvedValueOnce(categoryMock);

    jest
      .spyOn(prismaService.productCategory, 'findFirst')
      .mockResolvedValueOnce(null);

    const create = jest
      .spyOn(prismaService.productCategory, 'create')
      .mockResolvedValueOnce(productCategoryMock);

    const response = await useCase.execute(createProductCategoryDtoMock);

    expect(response).toStrictEqual(productCategoryMock);
    expect(create).toHaveBeenCalledWith({
      data: {
        ...createProductCategoryDtoMock,
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when product already have category', async () => {
    jest
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValueOnce(productMock);

    jest
      .spyOn(prismaService.category, 'findFirst')
      .mockResolvedValueOnce(categoryMock);

    jest
      .spyOn(prismaService.productCategory, 'findFirst')
      .mockResolvedValueOnce(productCategoryMock);

    const create = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute(createProductCategoryDtoMock)).rejects.toThrow(
      HttpException,
    );

    expect(create).toHaveBeenCalledTimes(1);
  });
});
