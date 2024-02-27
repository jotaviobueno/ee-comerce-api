import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CreateSkuDto } from 'src/domain/dtos';
import { SkuEntity } from 'src/domain/entities';
import { SkuRepository } from '../../sku.repository';
import { FindByIdColorUseCase } from 'src/core/modules/color/use-cases';
import { FindByIdProductUseCase } from 'src/core/modules/product/use-cases';
import { UploadManyFileUseCase } from 'src/core/modules/s3/use-cases';

@Injectable()
export class CreateSkuUseCase implements UseCaseBase<CreateSkuDto, SkuEntity> {
  constructor(
    private readonly skuRepository: SkuRepository,
    private readonly findByIdColorUseCase: FindByIdColorUseCase,
    private readonly findByIdProductUseCase: FindByIdProductUseCase,
    private readonly uploadManyFileUseCase: UploadManyFileUseCase,
  ) {}

  async execute({
    files,
    ...data
  }: CreateSkuDto & { files?: Express.Multer.File[] }): Promise<SkuEntity> {
    const product = await this.findByIdProductUseCase.execute(data.productId);

    const documents =
      files &&
      (await this.uploadManyFileUseCase.execute(
        files.map((file) => ({ file, path: 'sku' })),
      ));

    if (data.colorId) await this.findByIdColorUseCase.execute(data.colorId);

    const sku = await this.skuRepository.create({
      ...data,
      documents,
      productId: product.id,
    });

    return sku;
  }
}
