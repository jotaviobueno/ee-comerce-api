import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { HttpException } from '@nestjs/common';
import { SoftDeleteProductUseCase } from './soft-delete-product.use-case';
import { productModuleMock } from '../../product.module';
import { productMock } from 'src/__mocks__';

describe('SoftDeleteProductUseCase', () => {
  let useCase: SoftDeleteProductUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(productModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<SoftDeleteProductUseCase>(SoftDeleteProductUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be remove', async () => {
    jest
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValue(productMock);

    const remove = jest
      .spyOn(prismaService.product, 'update')
      .mockResolvedValue(productMock);

    const response = await useCase.execute('1');

    expect(response).toStrictEqual(true);
    expect(remove).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        deletedAt: expect.any(Date),
      },
    });
  });

  it('Should throw an error when failed to remove', async () => {
    jest
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValue(productMock);

    jest.spyOn(prismaService.product, 'update').mockResolvedValue(null);

    const remove = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute('1')).rejects.toThrow(HttpException);

    expect(remove).toHaveBeenCalledTimes(1);
  });
});
