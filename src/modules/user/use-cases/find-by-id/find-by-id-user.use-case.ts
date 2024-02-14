import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { UserEntity } from 'src/domain/entities';
import { UserRepository } from '../../user.repository';

@Injectable()
export class FindByIdUserUseCase
  implements UseCaseBase<string, Omit<UserEntity, 'password'>>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: string): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userRepository.findById(data);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }
}
