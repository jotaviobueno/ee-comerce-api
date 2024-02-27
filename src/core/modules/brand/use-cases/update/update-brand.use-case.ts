import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UpdateBrandDto } from 'src/domain/dtos';
import { BrandEntity } from 'src/domain/entities';
import { BrandRepository } from '../../brand.repository';
import { FindByIdBrandUseCase } from '../find-by-id';
import { UploadSingleFileUseCase } from 'src/core/modules/s3/use-cases';

@Injectable()
export class UpdateBrandUseCase
  implements
    UseCaseBase<UpdateBrandDto & { file?: Express.Multer.File }, BrandEntity>
{
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly findByIdBrandUseCase: FindByIdBrandUseCase,
    private readonly uploadSingleFileUseCase: UploadSingleFileUseCase,
  ) {}

  async execute({
    file,
    ...data
  }: UpdateBrandDto & { file?: Express.Multer.File }): Promise<BrandEntity> {
    const brand = await this.findByIdBrandUseCase.execute(data.id);

    const image =
      file &&
      (await this.uploadSingleFileUseCase.execute({ file, path: 'brand' }));

    const update = await this.brandRepository.update({
      ...data,
      image,
      id: brand.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
