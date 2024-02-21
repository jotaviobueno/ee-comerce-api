import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { colorMock, createColorDtoMock } from 'src/__mocks__';
import { colorModuleMock } from '../../color.module';
import { CreateColorUseCase } from './create-color.use-case';

describe('CreateColorUseCase', () => {
  let useCase: CreateColorUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(colorModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<CreateColorUseCase>(CreateColorUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be create', async () => {
    const create = jest
      .spyOn(prismaService.color, 'create')
      .mockResolvedValue(colorMock);

    const response = await useCase.execute(createColorDtoMock);

    expect(response).toStrictEqual(colorMock);
    expect(create).toHaveBeenCalledWith({
      data: {
        ...createColorDtoMock,
        deletedAt: null,
      },
    });
  });
});
