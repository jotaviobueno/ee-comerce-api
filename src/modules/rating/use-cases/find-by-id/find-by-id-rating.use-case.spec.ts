import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { FindByIdRatingUseCase } from './find-by-id-rating.use-case';
import { ratingModuleMock } from '../../rating.module';
import { ratingMock } from 'src/__mocks__';

describe('FindByIdRatingUseCase', () => {
  let useCase: FindByIdRatingUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(ratingModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<FindByIdRatingUseCase>(FindByIdRatingUseCase);
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
      .spyOn(prismaService.rating, 'findFirst')
      .mockResolvedValue(ratingMock);

    const response = await useCase.execute('1');

    expect(response).toStrictEqual(ratingMock);
    expect(findFirst).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found rating', async () => {
    jest.spyOn(prismaService.rating, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
