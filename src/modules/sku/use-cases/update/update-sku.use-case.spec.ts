import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { colorMock, skuMock, updateSkuDtoMock } from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { UpdateSkuUseCase } from './update-sku.use-case';
import { skuModuleMock } from '../../sku.module';

describe('UpdateSkuUseCase', () => {
  let useCase: UpdateSkuUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(skuModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<UpdateSkuUseCase>(UpdateSkuUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be update', async () => {
    jest.spyOn(prismaService.sku, 'findFirst').mockResolvedValue(skuMock);

    jest.spyOn(prismaService.color, 'findFirst').mockResolvedValue(colorMock);

    const update = jest
      .spyOn(prismaService.sku, 'update')
      .mockResolvedValue(skuMock);

    const response = await useCase.execute(updateSkuDtoMock);

    expect(response).toStrictEqual(skuMock);
    expect(update).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        colorId: '1',
        quantity: 10,
      },
    });
  });

  it('Should throw an error when failed to update', async () => {
    jest.spyOn(prismaService.sku, 'findFirst').mockResolvedValue(skuMock);

    jest.spyOn(prismaService.color, 'findFirst').mockResolvedValue(colorMock);

    jest.spyOn(prismaService.sku, 'update').mockResolvedValue(null);

    const update = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute(updateSkuDtoMock)).rejects.toThrow(
      HttpException,
    );

    expect(update).toHaveBeenCalledTimes(1);
  });
});
