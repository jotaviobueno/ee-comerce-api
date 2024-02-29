import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CreateColorDto } from 'src/domain/dtos';
import { ColorEntity } from 'src/domain/entities';
import { ColorRepository } from '../../color.repository';
import { FindByIdStoreUseCase } from 'src/core/modules/store/use-cases';

@Injectable()
export class CreateColorUseCase
  implements UseCaseBase<CreateColorDto, ColorEntity>
{
  constructor(
    private readonly colorRepository: ColorRepository,
    private readonly findByIdStoreUseCase: FindByIdStoreUseCase,
  ) {}

  async execute(data: CreateColorDto): Promise<ColorEntity> {
    const store = await this.findByIdStoreUseCase.execute(data.storeId);

    const color = await this.colorRepository.create({
      ...data,
      storeId: store.id,
    });

    return color;
  }
}
