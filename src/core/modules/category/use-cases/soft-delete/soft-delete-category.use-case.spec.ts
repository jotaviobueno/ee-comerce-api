import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { categoryMock } from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { categoryModuleMock } from '../../category.module';
import { SoftDeleteCategoryUseCase } from './soft-delete-category.use-case';

describe('SoftDeleteCategoryUseCase', () => {
  let useCase: SoftDeleteCategoryUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(categoryModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<SoftDeleteCategoryUseCase>(
      SoftDeleteCategoryUseCase,
    );
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
      .spyOn(prismaService.category, 'findFirst')
      .mockResolvedValue(categoryMock);

    const update = jest
      .spyOn(prismaService.category, 'update')
      .mockResolvedValue(categoryMock);

    const response = await useCase.execute('1');

    expect(response).toStrictEqual(true);
    expect(update).toHaveBeenCalledWith({
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
      .spyOn(prismaService.category, 'findFirst')
      .mockResolvedValue(categoryMock);

    jest.spyOn(prismaService.category, 'update').mockResolvedValue(null);

    const update = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute('1')).rejects.toThrow(HttpException);

    expect(update).toHaveBeenCalledTimes(1);
  });
});
