import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CreateColorDto } from 'src/domain/dtos';
import { ColorEntity } from 'src/domain/entities';
import { ColorRepository } from '../../color.repository';

@Injectable()
export class CreateColorUseCase
  implements UseCaseBase<CreateColorDto, ColorEntity>
{
  constructor(private readonly colorRepository: ColorRepository) {}

  execute(data: CreateColorDto): Promise<ColorEntity> {
    return this.colorRepository.create(data);
  }
}
