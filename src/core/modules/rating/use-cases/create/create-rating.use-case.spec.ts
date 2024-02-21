import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { createRatingDtoMock, productMock, ratingMock } from 'src/__mocks__';
import { CreateRatingUseCase } from './create-rating.use-case';
import { ratingModuleMock } from '../../rating.module';

describe('CreateRatingUseCase', () => {
  let useCase: CreateRatingUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(ratingModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<CreateRatingUseCase>(CreateRatingUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be create', async () => {
    jest
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValue(productMock);

    const create = jest
      .spyOn(prismaService.rating, 'create')
      .mockResolvedValue(ratingMock);

    const response = await useCase.execute(createRatingDtoMock);

    expect(response).toStrictEqual(ratingMock);
    expect(create).toHaveBeenCalledWith({
      data: {
        ...createRatingDtoMock,
        deletedAt: null,
      },
    });
  });
});
