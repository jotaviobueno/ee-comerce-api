import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { SkuEntity } from 'src/domain/entities';
import { SkuRepository } from '../../sku.repository';
import { QueryBuilder } from 'src/domain/utils';

@Injectable()
export class FindAllSkuUseCase
  implements UseCaseBase<QueryParamsDto, SkuEntity[]>
{
  constructor(private readonly skuRepository: SkuRepository) {}

  async execute(data: QueryParamsDto): Promise<SkuEntity[]> {
    const query = new QueryBuilder(data).pagination().handle();

    const skus = await this.skuRepository.findAll(query);

    return skus;
  }
}
