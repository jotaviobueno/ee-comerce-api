import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { ProductEntity } from 'src/domain/entities';
import { ProductRepository } from '../../product.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class FindByIdProductUseCase
  implements UseCaseBase<string, ProductEntity>
{
  constructor(
    private readonly productRepository: ProductRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(data: string): Promise<ProductEntity> {
    const cache = await this.cacheManager.get<ProductEntity | null>(data);

    if (cache) return cache;

    const product = await this.productRepository.findById(data);

    if (!product)
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);

    await this.cacheManager.set(data, product);

    return product;
  }
}
