import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';
import { QueryBuilder } from 'src/domain/utils/query-builder';
import { UserRepository } from '../../user.repository';

@Injectable()
export class FindAllUserUseCase
  implements UseCaseBase<QueryParamsDto, Omit<UserEntity, 'password'>[]>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: QueryParamsDto): Promise<Omit<UserEntity, 'password'>[]> {
    const query = new QueryBuilder(data).pagination().handle();

    const users = await this.userRepository.findAll(query);

    return users;
  }
}
