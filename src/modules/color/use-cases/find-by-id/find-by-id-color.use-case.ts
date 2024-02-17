import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { ColorEntity } from 'src/domain/entities';
import { ColorRepository } from '../../color.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class FindByIdColorUseCase implements UseCaseBase<string, ColorEntity> {
  constructor(
    private readonly colorRepository: ColorRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async execute(data: string): Promise<ColorEntity> {
    const cache = await this.cacheManager.get<ColorEntity | null>(data);

    if (cache) return cache;

    const color = await this.colorRepository.findById(data);

    if (!color)
      throw new HttpException('Color not found.', HttpStatus.NOT_FOUND);

    await this.cacheManager.set(data, color);

    return color;
  }
}
