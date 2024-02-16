import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { createProductDtoMock, productMock, storeMock } from 'src/__mocks__';
import { CreateProductUseCase } from './create-product.use-case';
import { productModuleMock } from '../../product.module';

describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(productModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<CreateProductUseCase>(CreateProductUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be create', async () => {
    jest.spyOn(prismaService.store, 'findFirst').mockResolvedValue(storeMock);

    const create = jest
      .spyOn(prismaService.product, 'create')
      .mockResolvedValue(productMock);

    const response = await useCase.execute(createProductDtoMock);

    expect(response).toStrictEqual(productMock);
    expect(create).toHaveBeenCalledWith({
      data: {
        ...createProductDtoMock,
        deletedAt: null,
      },
    });
  });
});
