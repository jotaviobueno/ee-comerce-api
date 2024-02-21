import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { ratingMock, updateRatingDtoMock } from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { UpdateRatingUseCase } from './update-rating.use-case';
import { ratingModuleMock } from '../../rating.module';

describe('UpdateRatingUseCase', () => {
  let useCase: UpdateRatingUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(ratingModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<UpdateRatingUseCase>(UpdateRatingUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be update', async () => {
    jest.spyOn(prismaService.rating, 'findFirst').mockResolvedValue(ratingMock);

    const update = jest
      .spyOn(prismaService.rating, 'update')
      .mockResolvedValue(ratingMock);

    const response = await useCase.execute(updateRatingDtoMock);

    expect(response).toStrictEqual(ratingMock);
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
    jest.spyOn(prismaService.rating, 'findFirst').mockResolvedValue(ratingMock);

    jest.spyOn(prismaService.rating, 'update').mockResolvedValue(null);

    const update = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute(updateRatingDtoMock)).rejects.toThrow(
      HttpException,
    );

    expect(update).toHaveBeenCalledTimes(1);
  });
});
