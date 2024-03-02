import { Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { FindAllResultEntity, UserEntity } from 'src/domain/entities';
import { UserRepository } from '../../user.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class FindAllUserUseCase
  implements
    UseCaseBase<
      QueryParamsDto,
      FindAllResultEntity<Omit<UserEntity, 'password'>>
    >
{
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(
    data: QueryParamsDto,
  ): Promise<FindAllResultEntity<Omit<UserEntity, 'password'>>> {
    const cache = await this.cacheManager.get<FindAllResultEntity<
      Omit<UserEntity, 'password'>
    > | null>('users');

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const users = await this.userRepository.findAll(query);
    const total = await this.userRepository.count(query);

    const result: FindAllResultEntity<Omit<UserEntity, 'password'>> = {
      data: users,
      total,
      page: data.page,
      totalPage: Math.ceil(total / data.pageSize),
      pageSize: data.pageSize,
    };

    await this.cacheManager.set('users', result);

    return result;
  }
}
