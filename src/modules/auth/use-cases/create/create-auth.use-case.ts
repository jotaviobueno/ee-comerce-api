import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UseCaseBase } from 'src/domain/base';
import { CreateAuthDto } from 'src/domain/dtos';
import { AuthEntity } from 'src/domain/entities';
import { compare } from 'src/domain/utils';
import { FindByEmailUserUseCase } from 'src/modules/user/use-cases';

@Injectable()
export class CreateAuthUseCase
  implements UseCaseBase<CreateAuthDto, AuthEntity>
{
  constructor(
    private readonly findByEmailUserUseCase: FindByEmailUserUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: CreateAuthDto): Promise<AuthEntity> {
    const user = await this.findByEmailUserUseCase.execute(data.email);

    const passwordIsEqual = await compare(data.password, user.password);

    if (!passwordIsEqual)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    const token = this.jwtService.sign({
      sub: user.id,
    });

    return { token };
  }
}
