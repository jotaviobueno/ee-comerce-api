import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { categoryMock, createCategoryDtoMock } from 'src/__mocks__';
import { CreateCategoryUseCase } from './create-category.use-case';
import { categoryModuleMock } from '../../category.module';

describe('CreateCategoryUseCase', () => {
  let useCase: CreateCategoryUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(categoryModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<CreateCategoryUseCase>(CreateCategoryUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be create', async () => {
    const create = jest
      .spyOn(prismaService.category, 'create')
      .mockResolvedValue(categoryMock);

    const response = await useCase.execute(createCategoryDtoMock);

    expect(response).toStrictEqual(categoryMock);
    expect(create).toHaveBeenCalledWith({
      data: {
        ...createCategoryDtoMock,
        deletedAt: null,
      },
    });
  });
});
