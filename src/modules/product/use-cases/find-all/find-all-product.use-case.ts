import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { ProductRepository } from '../../product.repository';
import { QueryBuilder } from 'src/domain/utils';

@Injectable()
export class FindAllProductUseCase implements UseCaseBase<QueryParamsDto, any> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: QueryParamsDto): Promise<any> {
    const query = new QueryBuilder(data).pagination().handle();

    const products = await this.productRepository.findAll(query);

    return products;
  }
}
