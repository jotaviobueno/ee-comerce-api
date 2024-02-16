import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { colorMock, updateColorDtoMock } from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { colorModuleMock } from '../../color.module';
import { UpdateColorUseCase } from './update-color.use-case';

describe('UpdateColorUseCase', () => {
  let useCase: UpdateColorUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(colorModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<UpdateColorUseCase>(UpdateColorUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be update', async () => {
    jest.spyOn(prismaService.color, 'findFirst').mockResolvedValue(colorMock);

    const update = jest
      .spyOn(prismaService.color, 'update')
      .mockResolvedValue(colorMock);

    const response = await useCase.execute(updateColorDtoMock);

    expect(response).toStrictEqual(colorMock);
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
    jest.spyOn(prismaService.color, 'findFirst').mockResolvedValue(colorMock);

    jest.spyOn(prismaService.color, 'update').mockResolvedValue(null);

    const update = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute(updateColorDtoMock)).rejects.toThrow(
      HttpException,
    );

    expect(update).toHaveBeenCalledTimes(1);
  });
});
