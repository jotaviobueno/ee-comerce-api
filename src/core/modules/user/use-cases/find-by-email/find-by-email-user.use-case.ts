import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UserEntity } from 'src/domain/entities';
import { UserRepository } from '../../user.repository';

@Injectable()
export class FindByEmailUserUseCase implements UseCaseBase<string, UserEntity> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(data);

    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    return user;
  }
}
