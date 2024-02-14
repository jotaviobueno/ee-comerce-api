import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/domain/dtos';
import { QueryBuilderEntity, UserEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class UserRepository extends RepositoryFactory<
  UserEntity | Omit<UserEntity, 'password'>,
  CreateUserDto,
  UpdateUserDto
> {
  constructor() {
    super('user');
  }

  create(data: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
    return this.prismaService.user.create({
      data: {
        ...data,
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
  }

  findById(id: string): Promise<Omit<UserEntity, 'password'>> {
    return this.prismaService.user.findFirst({
      where: {
        id,
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
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.prismaService.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
  }

  findByUsername(username: string): Promise<UserEntity | null> {
    return this.prismaService.user.findFirst({
      where: {
        username,
        deletedAt: null,
      },
    });
  }

  findAll(query: QueryBuilderEntity): Promise<Omit<UserEntity, 'password'>[]> {
    return this.prismaService.user.findMany({
      ...query,
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
  }

  update({
    id,
    ...data
  }: UpdateUserDto & { id: string }): Promise<Omit<UserEntity, 'password'>> {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...data,
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
  }
}
