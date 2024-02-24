import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UpdateStoreDto } from 'src/domain/dtos';
import { StoreEntity } from 'src/domain/entities';
import { StoreRepository } from '../../store.repository';
import { FindByIdStoreUseCase } from '../find-by-id';
import { UploadSingleFileUseCase } from 'src/core/modules/s3/use-cases';

@Injectable()
export class UpdateStoreUseCase
  implements
    UseCaseBase<UpdateStoreDto & { file?: Express.Multer.File }, StoreEntity>
{
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly findByIdStoreUseCase: FindByIdStoreUseCase,
    private readonly uploadSingleFileUseCase: UploadSingleFileUseCase,
  ) {}

  async execute({
    file,
    ...data
  }: UpdateStoreDto & { file?: Express.Multer.File }): Promise<StoreEntity> {
    const store = await this.findByIdStoreUseCase.execute(data.id);

    const logo =
      file &&
      (await this.uploadSingleFileUseCase.execute({
        file,
        path: 'store/logo',
      }));

    const update = await this.storeRepository.update({
      ...data,
      id: store.id,
      logo,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
