import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { CreateUserDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';
import { UserRepository } from '../../user.repository';
import { hash } from 'src/domain/utils/bcrypt';

@Injectable()
export class CreateUserUseCase
  implements UseCaseBase<CreateUserDto, Omit<UserEntity, 'password'>>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
    const emailAlreadyExist = await this.userRepository.findByEmail(data.email);

    if (emailAlreadyExist)
      throw new HttpException(
        'Username or email already exist.',
        HttpStatus.CONFLICT,
      );

    const usernameAlreadyExist = await this.userRepository.findByUsername(
      data.username,
    );

    if (usernameAlreadyExist)
      throw new HttpException(
        'Username or email already exist.',
        HttpStatus.CONFLICT,
      );

    data.password = await hash(data.password);

    const user = await this.userRepository.create(data);

    return user;
  }
}
