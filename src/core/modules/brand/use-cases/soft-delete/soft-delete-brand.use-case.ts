import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { BrandRepository } from '../../brand.repository';
import { FindByIdBrandUseCase } from '../find-by-id';

@Injectable()
export class SoftDeleteBrandUseCase implements UseCaseBase<string, boolean> {
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly findByIdBrandUseCase: FindByIdBrandUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const brand = await this.findByIdBrandUseCase.execute(data);

    const remove = await this.brandRepository.softDelete(brand.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
