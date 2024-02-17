import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { colorMock } from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { FindByIdColorUseCase } from './find-by-id-color.use-case';
import { colorModuleMock } from '../../color.module';

describe('FindByIdColorUseCase', () => {
  let useCase: FindByIdColorUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(colorModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<FindByIdColorUseCase>(FindByIdColorUseCase);
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
      .spyOn(prismaService.color, 'findFirst')
      .mockResolvedValue(colorMock);

    const response = await useCase.execute('1');

    expect(response).toStrictEqual(colorMock);
    expect(findFirst).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found color', async () => {
    jest.spyOn(prismaService.color, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
