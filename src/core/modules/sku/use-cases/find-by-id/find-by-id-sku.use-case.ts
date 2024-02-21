import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { SkuEntity } from 'src/domain/entities';
import { SkuRepository } from '../../sku.repository';

@Injectable()
export class FindByIdSkuUseCase implements UseCaseBase<string, SkuEntity> {
  constructor(private readonly skuRepository: SkuRepository) {}

  async execute(data: string): Promise<SkuEntity> {
    const sku = await this.skuRepository.findById(data);

    if (!sku) throw new HttpException('Sku not found', HttpStatus.NOT_FOUND);

    return sku;
  }
}
