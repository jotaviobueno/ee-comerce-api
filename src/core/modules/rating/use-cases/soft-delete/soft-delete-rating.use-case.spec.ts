import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { ratingMock } from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { SoftDeleteRatingUseCase } from './soft-delete-rating.use-case';
import { ratingModuleMock } from '../../rating.module';

describe('SoftDeleteRatingUseCase', () => {
  let useCase: SoftDeleteRatingUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(ratingModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<SoftDeleteRatingUseCase>(SoftDeleteRatingUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be remove', async () => {
    jest.spyOn(prismaService.rating, 'findFirst').mockResolvedValue(ratingMock);

    const remove = jest
      .spyOn(prismaService.rating, 'update')
      .mockResolvedValue(ratingMock);

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
    jest.spyOn(prismaService.rating, 'findFirst').mockResolvedValue(ratingMock);

    jest.spyOn(prismaService.rating, 'update').mockResolvedValue(null);

    const remove = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute('1')).rejects.toThrow(HttpException);

    expect(remove).toHaveBeenCalledTimes(1);
  });
});
