import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';
import { UserRepository } from '../../user.repository';
import { FindByIdUserUseCase } from '../find-by-id';
import { UseCaseBase } from 'src/common/base';

@Injectable()
export class UpdateUserUseCase
  implements UseCaseBase<UpdateUserDto, Omit<UserEntity, 'password'>>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
  ) {}

  async execute(data: UpdateUserDto): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.findByIdUserUseCase.execute(data.id);

    if (data.username) {
      const usernameAlreadyExist = await this.userRepository.findByUsername(
        data.username,
      );

      if (usernameAlreadyExist)
        throw new HttpException('Username already exist.', HttpStatus.CONFLICT);
    }

    const update = await this.userRepository.update({ ...data, id: user.id });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
