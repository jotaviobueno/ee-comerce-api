import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { ColorEntity } from 'src/domain/entities';
import { ColorRepository } from '../../color.repository';
import { QueryBuilder } from 'src/domain/utils';

@Injectable()
export class FindAllColorUseCase
  implements UseCaseBase<QueryParamsDto, ColorEntity[]>
{
  constructor(private readonly colorRepository: ColorRepository) {}

  async execute(data: QueryParamsDto): Promise<ColorEntity[]> {
    const query = new QueryBuilder(data).pagination().handle();

    const colors = await this.colorRepository.findAll(query);

    return colors;
  }
}
