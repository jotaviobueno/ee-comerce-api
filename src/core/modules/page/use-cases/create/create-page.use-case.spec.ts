import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { createPageDtoMock, pageMock } from 'src/__mocks__';
import { CreatePageUseCase } from './create-page.use-case';
import { pageModuleMock } from '../../page.module';

describe('CreatePageUseCase', () => {
  let useCase: CreatePageUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(pageModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<CreatePageUseCase>(CreatePageUseCase);
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
      .spyOn(prismaService.page, 'create')
      .mockResolvedValue(pageMock);

    const response = await useCase.execute(createPageDtoMock);

    expect(response).toStrictEqual(pageMock);
    expect(create).toHaveBeenCalledWith({
      data: {
        ...createPageDtoMock,
        deletedAt: null,
      },
    });
  });
});
