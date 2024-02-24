import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UpdateSkuDto } from 'src/domain/dtos';
import { SkuEntity } from 'src/domain/entities';
import { SkuRepository } from '../../sku.repository';
import { FindByIdSkuUseCase } from '../find-by-id';
import { FindByIdColorUseCase } from 'src/core/modules/color/use-cases';

@Injectable()
export class UpdateSkuUseCase implements UseCaseBase<UpdateSkuDto, SkuEntity> {
  constructor(
    private readonly skuRepository: SkuRepository,
    private readonly findByIdSkuUseCase: FindByIdSkuUseCase,
    private readonly findByIdColorUseCase: FindByIdColorUseCase,
  ) {}

  async execute(data: UpdateSkuDto): Promise<SkuEntity> {
    const sku = await this.findByIdSkuUseCase.execute(data.id);

    if (data.colorId) await this.findByIdColorUseCase.execute(data.colorId);

    const update = await this.skuRepository.update({ ...data, id: sku.id });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}