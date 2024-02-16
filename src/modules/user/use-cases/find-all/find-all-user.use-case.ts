import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';
import { QueryBuilder } from 'src/domain/utils/query-builder';
import { UserRepository } from '../../user.repository';
import { CacheService } from 'src/common/cache/cache.service';

@Injectable()
export class FindAllUserUseCase
  implements UseCaseBase<QueryParamsDto, Omit<UserEntity, 'password'>[]>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(data: QueryParamsDto): Promise<Omit<UserEntity, 'password'>[]> {
    const cache =
      await this.cacheService.getCache<Omit<UserEntity, 'password'>[]>('users');

    if (cache) return cache;

    const query = new QueryBuilder(data).pagination().handle();

    const users = await this.userRepository.findAll(query);

    await this.cacheService.setCache('users', users);

    return users;
  }
}
