import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { productMock, updateProductDtoMock } from 'src/__mocks__';
import { UpdateProductUseCase } from './update-product.use-case';
import { productModuleMock } from '../../product.module';
import { HttpException } from '@nestjs/common';

describe('UpdateProductUseCase', () => {
  let useCase: UpdateProductUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(productModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<UpdateProductUseCase>(UpdateProductUseCase);
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
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValue(productMock);

    const update = jest
      .spyOn(prismaService.product, 'update')
      .mockResolvedValue(productMock);

    const response = await useCase.execute(updateProductDtoMock);

    expect(response).toStrictEqual(productMock);
    expect(update).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        name: 'name',
      },
    });
  });

  it('Should throw an error when failed to update', async () => {
    jest
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValue(productMock);

    jest.spyOn(prismaService.product, 'update').mockResolvedValue(null);

    const update = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute(updateProductDtoMock)).rejects.toThrow(
      HttpException,
    );

    expect(update).toHaveBeenCalledTimes(1);
  });
});
