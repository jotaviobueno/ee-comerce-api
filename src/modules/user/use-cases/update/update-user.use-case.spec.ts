import { Test, TestingModule } from '@nestjs/testing';
import { userModuleMock } from '../../user.module';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { updateUserDtoMock, userMock } from 'src/__mocks__';
import { HttpException } from '@nestjs/common';
import { UpdateUserUseCase } from './update-user.use-case';

describe('UpdateUserUseCase', () => {
  let useCase: UpdateUserUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(userModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    useCase = moduleRef.get<UpdateUserUseCase>(UpdateUserUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be update', async () => {
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(userMock);

    const update = jest
      .spyOn(prismaService.user, 'update')
      .mockResolvedValue(userMock);

    const response = await useCase.execute(updateUserDtoMock);

    expect(response).toStrictEqual(userMock);
    expect(update).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        firstName: 'firstName',
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

  it('Should throw when try to update with username already exist', async () => {
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(userMock);

    const update = jest.spyOn(useCase, 'execute');

    await expect(
      useCase.execute({ ...updateUserDtoMock, username: 'username' }),
    ).rejects.toThrow(HttpException);

    expect(update).toHaveBeenCalledTimes(1);
  });

  it('Should throw an error when failed to update', async () => {
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(userMock);

    jest.spyOn(prismaService.user, 'update').mockResolvedValue(null);

    const update = jest.spyOn(useCase, 'execute');

    await expect(useCase.execute(updateUserDtoMock)).rejects.toThrow(
      HttpException,
    );

    expect(update).toHaveBeenCalledTimes(1);
  });
});
