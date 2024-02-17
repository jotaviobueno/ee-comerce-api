import { Test, TestingModule } from '@nestjs/testing';
import { categoryMock } from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { FindByIdCategoryUseCase } from './find-by-id-category.use-case';
import { categoryModuleMock } from '../../category.module';

describe('FindByIdCategoryUseCase', () => {
  let useCase: FindByIdCategoryUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(categoryModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<FindByIdCategoryUseCase>(FindByIdCategoryUseCase);
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
      .spyOn(prismaService.category, 'findFirst')
      .mockResolvedValue(categoryMock);

    const response = await useCase.execute('1');

    expect(response).toStrictEqual(categoryMock);
    expect(findFirst).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found category', async () => {
    jest.spyOn(prismaService.category, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
