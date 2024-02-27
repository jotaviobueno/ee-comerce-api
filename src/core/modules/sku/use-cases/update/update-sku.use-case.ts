import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UpdateSkuDto } from 'src/domain/dtos';
import { SkuEntity } from 'src/domain/entities';
import { SkuRepository } from '../../sku.repository';
import { FindByIdSkuUseCase } from '../find-by-id';
import { FindByIdColorUseCase } from 'src/core/modules/color/use-cases';
import { UploadManyFileUseCase } from 'src/core/modules/s3/use-cases';

@Injectable()
export class UpdateSkuUseCase
  implements
    UseCaseBase<UpdateSkuDto & { files?: Express.Multer.File[] }, SkuEntity>
{
  constructor(
    private readonly skuRepository: SkuRepository,
    private readonly findByIdSkuUseCase: FindByIdSkuUseCase,
    private readonly findByIdColorUseCase: FindByIdColorUseCase,
    private readonly uploadManyFileUseCase: UploadManyFileUseCase,
  ) {}

  async execute({
    files,
    ...data
  }: UpdateSkuDto & { files?: Express.Multer.File[] }): Promise<SkuEntity> {
    const sku = await this.findByIdSkuUseCase.execute(data.id);

    if (data.colorId) await this.findByIdColorUseCase.execute(data.colorId);

    const documents =
      files &&
      (await this.uploadManyFileUseCase.execute(
        files.map((file) => ({ file, path: 'sku' })),
      ));

    const update = await this.skuRepository.update({
      ...data,
      id: sku.id,
      documents,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
