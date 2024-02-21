import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { ColorEntity } from 'src/domain/entities';
import { ColorRepository } from '../../color.repository';

@Injectable()
export class FindByIdColorUseCase implements UseCaseBase<string, ColorEntity> {
  constructor(private readonly colorRepository: ColorRepository) {}

  async execute(data: string): Promise<ColorEntity> {
    const color = await this.colorRepository.findById(data);

    if (!color)
      throw new HttpException('Color not found.', HttpStatus.NOT_FOUND);

    return color;
  }
}
