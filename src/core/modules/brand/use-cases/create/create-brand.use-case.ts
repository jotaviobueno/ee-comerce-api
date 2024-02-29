import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CreateBrandDto } from 'src/domain/dtos';
import { BrandEntity } from 'src/domain/entities';
import { BrandRepository } from '../../brand.repository';

@Injectable()
export class CreateBrandUseCase
  implements UseCaseBase<CreateBrandDto, BrandEntity>
{
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute(data: CreateBrandDto): Promise<BrandEntity> {
    const brand = await this.brandRepository.create(data);

    return brand;
  }
}
