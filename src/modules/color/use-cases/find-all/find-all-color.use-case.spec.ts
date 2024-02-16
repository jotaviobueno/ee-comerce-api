import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { colorMock, queryParamsDtoMock } from 'src/__mocks__';
import { FindAllColorUseCase } from './find-all-color.use-case';
import { colorModuleMock } from '../../color.module';

describe('FindAllColorUseCase', () => {
  let useCase: FindAllColorUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(colorModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<FindAllColorUseCase>(FindAllColorUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be find All', async () => {
    const findAll = jest
      .spyOn(prismaService.color, 'findMany')
      .mockResolvedValue([colorMock]);

    const response = await useCase.execute(queryParamsDtoMock);

    expect(response).toStrictEqual([colorMock]);
    expect(findAll).toHaveBeenCalledWith({
      skip: 0,
      take: 200,
      where: {
        deletedAt: null,
      },
    });
  });
});
