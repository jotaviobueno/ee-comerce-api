import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { BrandEntity } from 'src/domain/entities';
import { BrandRepository } from '../../brand.repository';

@Injectable()
export class FindByIdBrandUseCase implements UseCaseBase<string, BrandEntity> {
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute(data: string): Promise<BrandEntity> {
    const brand = await this.brandRepository.findById(data);

    if (!brand)
      throw new HttpException('Brand not found.', HttpStatus.NOT_FOUND);

    return brand;
  }
}
