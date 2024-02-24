import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CreateStoreDto } from 'src/domain/dtos';
import { StoreEntity } from 'src/domain/entities';
import { StoreRepository } from '../../store.repository';
import { FindByIdUserUseCase } from 'src/core/modules/user/use-cases';
import { CreatePageUseCase } from 'src/core/modules/page/use-cases';
import { UploadSingleFileUseCase } from 'src/core/modules/s3/use-cases';

@Injectable()
export class CreateStoreUseCase
  implements
    UseCaseBase<CreateStoreDto & { file?: Express.Multer.File }, StoreEntity>
{
  constructor(
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
    private readonly storeRepository: StoreRepository,
    private readonly createPageUseCase: CreatePageUseCase,
    private readonly uploadSingleFileUseCase: UploadSingleFileUseCase,
  ) {}

  async execute({
    file,
    ...data
  }: CreateStoreDto & { file?: Express.Multer.File }): Promise<StoreEntity> {
    const user = await this.findByIdUserUseCase.execute(data.userId);

    const logo =
      file &&
      (await this.uploadSingleFileUseCase.execute({
        file,
        path: 'store/logo',
      }));

    const store = await this.storeRepository.create({
      ...data,
      logo,
      userId: user.id,
    });

    await this.createPageUseCase.execute({ storeId: store.id });

    return store;
  }
}
