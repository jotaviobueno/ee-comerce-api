import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UpdatePageDto } from 'src/domain/dtos';
import { PageEntity } from 'src/domain/entities';
import { PageRepository } from '../../page.repository';
import { FindByIdPageUseCase } from '../find-by-id';
import { UploadManyFileUseCase } from 'src/core/modules/s3/use-cases';

@Injectable()
export class UpdatePageUseCase
  implements
    UseCaseBase<UpdatePageDto & { files?: Express.Multer.File[] }, PageEntity>
{
  constructor(
    private readonly pageRepository: PageRepository,
    private readonly findByIdPageUseCase: FindByIdPageUseCase,
    private readonly uploadManyFileUseCase: UploadManyFileUseCase,
  ) {}

  async execute({
    files,
    ...data
  }: UpdatePageDto & { files?: Express.Multer.File[] }): Promise<PageEntity> {
    const page = await this.findByIdPageUseCase.execute(data.id);

    const images =
      files &&
      (await this.uploadManyFileUseCase.execute(
        files.map((file) => ({ file, path: 'page' })),
      ));

    const update = await this.pageRepository.update({
      ...data,
      id: page.id,
      images,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
