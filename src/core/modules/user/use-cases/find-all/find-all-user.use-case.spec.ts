import { Test, TestingModule } from '@nestjs/testing';
import { userModuleMock } from '../../user.module';
import { queryParamsDtoMock, userMock } from 'src/__mocks__';
import { FindAllUserUseCase } from './find-all-user.use-case';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('FindAllUserUseCase', () => {
  let useCase: FindAllUserUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;
  let cache: Cache;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(userModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<FindAllUserUseCase>(FindAllUserUseCase);
    cache = moduleRef.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be find All', async () => {
    jest.spyOn(cache, 'get').mockResolvedValue(null);

    jest.spyOn(cache, 'set').mockResolvedValue();

    const findAll = jest
      .spyOn(prismaService.user, 'findMany')
      .mockResolvedValue([userMock]);

    const response = await useCase.execute(queryParamsDtoMock);

    expect(response).toStrictEqual([userMock]);
    expect(findAll).toHaveBeenCalledWith({
      skip: 0,
      take: 200,
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  });
});
