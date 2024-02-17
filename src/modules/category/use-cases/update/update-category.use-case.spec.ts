import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { categoryMock, updateCategoryDtoMock } from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { UpdateCategoryUseCase } from './update-category.use-case';
import { categoryModuleMock } from '../../category.module';

describe('UpdateCategoryUseCase', () => {
  let useCase: UpdateCategoryUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(categoryModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<UpdateCategoryUseCase>(UpdateCategoryUseCase);
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
      .spyOn(prismaService.category, 'findFirst')
      .mockResolvedValue(categoryMock);

    const update = jest
      .spyOn(prismaService.category, 'update')
      .mockResolvedValue(categoryMock);

    const response = await useCase.execute(updateCategoryDtoMock);

    expect(response).toStrictEqual(categoryMock);
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
      .spyOn(prismaService.category, 'findFirst')
      .mockResolvedValue(categoryMock);

    jest.spyOn(prismaService.category, 'update').mockResolvedValue(null);

    const update = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute(updateCategoryDtoMock)).rejects.toThrow(
      HttpException,
    );

    expect(update).toHaveBeenCalledTimes(1);
  });
});
