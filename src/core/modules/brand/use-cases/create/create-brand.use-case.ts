import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UploadSingleFileUseCase } from 'src/core/modules/s3/use-cases';
import { CreateBrandDto } from 'src/domain/dtos';
import { BrandEntity } from 'src/domain/entities';
import { BrandRepository } from '../../brand.repository';

@Injectable()
export class CreateBrandUseCase
  implements
    UseCaseBase<CreateBrandDto & { file?: Express.Multer.File }, BrandEntity>
{
  constructor(
    private readonly uploadSingleFileUseCase: UploadSingleFileUseCase,
    private readonly brandRepository: BrandRepository,
  ) {}

  async execute({
    file,
    ...data
  }: CreateBrandDto & { file?: Express.Multer.File }): Promise<BrandEntity> {
    const image =
      file &&
      (await this.uploadSingleFileUseCase.execute({ file, path: 'brand' }));

    const brand = await this.brandRepository.create({ ...data, image });

    return brand;
  }
}
