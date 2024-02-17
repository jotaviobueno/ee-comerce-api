import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { UserEntity } from 'src/domain/entities';
import { UserRepository } from '../../user.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class FindByIdUserUseCase
  implements UseCaseBase<string, Omit<UserEntity, 'password'>>
{
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(data: string): Promise<Omit<UserEntity, 'password'>> {
    const cache = await this.cacheManager.get<Omit<
      UserEntity,
      'password'
    > | null>(data);

    if (cache) return cache;

    const user = await this.userRepository.findById(data);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    await this.cacheManager.set(data, user);

    return user;
  }
}
