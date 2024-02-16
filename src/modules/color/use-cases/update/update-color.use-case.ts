import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { UpdateColorDto } from 'src/domain/dtos';
import { ColorEntity } from 'src/domain/entities';
import { ColorRepository } from '../../color.repository';
import { FindByIdColorUseCase } from '../find-by-id';

@Injectable()
export class UpdateColorUseCase
  implements UseCaseBase<UpdateColorDto, ColorEntity>
{
  constructor(
    private readonly colorRepository: ColorRepository,
    private readonly findByIdColorUseCase: FindByIdColorUseCase,
  ) {}

  async execute(data: UpdateColorDto): Promise<ColorEntity> {
    const color = await this.findByIdColorUseCase.execute(data.id);

    const update = await this.colorRepository.update({ ...data, id: color.id });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
