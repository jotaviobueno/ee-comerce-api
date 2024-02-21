import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { pageMock } from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { FindByIdPageUseCase } from './find-by-id-page.use-case';
import { pageModuleMock } from '../../page.module';

describe('FindByIdPageUseCase', () => {
  let useCase: FindByIdPageUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(pageModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<FindByIdPageUseCase>(FindByIdPageUseCase);
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
      .spyOn(prismaService.page, 'findFirst')
      .mockResolvedValue(pageMock);

    const response = await useCase.execute('1');

    expect(response).toStrictEqual(pageMock);
    expect(findFirst).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found page', async () => {
    jest.spyOn(prismaService.page, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
