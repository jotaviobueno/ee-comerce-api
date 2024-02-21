import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CreateSkuDto } from 'src/domain/dtos';
import { SkuEntity } from 'src/domain/entities';
import { SkuRepository } from '../../sku.repository';
import { FindByIdColorUseCase } from 'src/core/modules/color/use-cases';
import { FindByIdProductUseCase } from 'src/core/modules/product/use-cases';

@Injectable()
export class CreateSkuUseCase implements UseCaseBase<CreateSkuDto, SkuEntity> {
  constructor(
    private readonly skuRepository: SkuRepository,
    private readonly findByIdColorUseCase: FindByIdColorUseCase,
    private readonly findByIdProductUseCase: FindByIdProductUseCase,
  ) {}

  async execute(data: CreateSkuDto): Promise<SkuEntity> {
    const product = await this.findByIdProductUseCase.execute(data.productId);

    if (data.colorId) await this.findByIdColorUseCase.execute(data.colorId);

    const sku = await this.skuRepository.create({
      ...data,
      productId: product.id,
    });

    return sku;
  }
}
