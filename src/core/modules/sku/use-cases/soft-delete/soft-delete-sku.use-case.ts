import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { FindByIdSkuUseCase } from '../find-by-id';
import { SkuRepository } from '../../sku.repository';

@Injectable()
export class SoftDeleteSkuUseCase implements UseCaseBase<string, boolean> {
  constructor(
    private readonly findByIdSkuUseCase: FindByIdSkuUseCase,
    private readonly skuRepository: SkuRepository,
  ) {}

  async execute(data: string): Promise<boolean> {
    const sku = await this.findByIdSkuUseCase.execute(data);

    const softDelete = await this.skuRepository.softDelete(sku.id);

    if (!softDelete)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
