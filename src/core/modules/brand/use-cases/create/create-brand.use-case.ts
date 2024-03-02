import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CreateBrandDto } from 'src/domain/dtos';
import { BrandEntity } from 'src/domain/entities';
import { BrandRepository } from '../../brand.repository';
import { FindByIdStoreUseCase } from 'src/core/modules/store/use-cases';

@Injectable()
export class CreateBrandUseCase
  implements UseCaseBase<CreateBrandDto, BrandEntity>
{
  constructor(
    private readonly brandRepository: BrandRepository,
    @Inject(forwardRef(() => FindByIdStoreUseCase))
    private readonly findByIdStoreUseCase: FindByIdStoreUseCase,
  ) {}

  async execute(data: CreateBrandDto): Promise<BrandEntity> {
    const store = await this.findByIdStoreUseCase.execute(data.storeId);

    const brand = await this.brandRepository.create({
      ...data,
      storeId: store.id,
    });

    return brand;
  }
}
