import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UpdateBrandDto } from 'src/domain/dtos';
import { BrandEntity } from 'src/domain/entities';
import { BrandRepository } from '../../brand.repository';
import { FindByIdBrandUseCase } from '../find-by-id';

@Injectable()
export class UpdateBrandUseCase
  implements UseCaseBase<UpdateBrandDto, BrandEntity>
{
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly findByIdBrandUseCase: FindByIdBrandUseCase,
  ) {}

  async execute(data: UpdateBrandDto): Promise<BrandEntity> {
    const brand = await this.findByIdBrandUseCase.execute(data.id);

    const update = await this.brandRepository.update({
      ...data,
      id: brand.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
