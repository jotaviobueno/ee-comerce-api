import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';
import { QueryBuilder } from 'src/domain/utils/query-builder';
import { UserRepository } from '../../user.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class FindAllUserUseCase
  implements UseCaseBase<QueryParamsDto, Omit<UserEntity, 'password'>[]>
{
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(data: QueryParamsDto): Promise<Omit<UserEntity, 'password'>[]> {
    const cache = await this.cacheManager.get<
      Omit<UserEntity, 'password'>[] | null
    >('users');

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const users = await this.userRepository.findAll(query);

    if (users.length > 0) await this.cacheManager.set('users', users);

    return users;
  }
}
