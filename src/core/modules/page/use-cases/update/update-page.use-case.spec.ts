import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { pageMock, updatePageDtoMock } from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { UpdatePageUseCase } from './update-page.use-case';
import { pageModuleMock } from '../../page.module';

describe('UpdatePageUseCase', () => {
  let useCase: UpdatePageUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(pageModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<UpdatePageUseCase>(UpdatePageUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be update', async () => {
    jest.spyOn(prismaService.page, 'findFirst').mockResolvedValue(pageMock);

    const update = jest
      .spyOn(prismaService.page, 'update')
      .mockResolvedValue(pageMock);

    const response = await useCase.execute(updatePageDtoMock);

    expect(response).toStrictEqual(pageMock);
    expect(update).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        images: undefined,
      },
    });
  });

  it('Should throw an error when failed to update', async () => {
    jest.spyOn(prismaService.page, 'findFirst').mockResolvedValue(pageMock);

    jest.spyOn(prismaService.page, 'update').mockResolvedValue(null);

    const update = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute(updatePageDtoMock)).rejects.toThrow(
      HttpException,
    );

    expect(update).toHaveBeenCalledTimes(1);
  });
});
