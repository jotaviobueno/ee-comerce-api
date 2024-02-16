import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { HttpException } from '@nestjs/common';
import { colorMock } from 'src/__mocks__';
import { SoftDeleteColorUseCase } from './soft-delete-color.use-case';
import { colorModuleMock } from '../../color.module';

describe('SoftDeleteColorUseCase', () => {
  let useCase: SoftDeleteColorUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(colorModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<SoftDeleteColorUseCase>(SoftDeleteColorUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be remove', async () => {
    jest.spyOn(prismaService.color, 'findFirst').mockResolvedValue(colorMock);

    const remove = jest
      .spyOn(prismaService.color, 'update')
      .mockResolvedValue(colorMock);

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
    jest.spyOn(prismaService.color, 'findFirst').mockResolvedValue(colorMock);

    jest.spyOn(prismaService.color, 'update').mockResolvedValue(null);

    const remove = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute('1')).rejects.toThrow(HttpException);

    expect(remove).toHaveBeenCalledTimes(1);
  });
});
