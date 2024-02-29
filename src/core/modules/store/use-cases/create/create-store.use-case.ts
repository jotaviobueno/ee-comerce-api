import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CreateStoreDto } from 'src/domain/dtos';
import { StoreEntity } from 'src/domain/entities';
import { StoreRepository } from '../../store.repository';
import { CreatePageUseCase } from 'src/core/modules/page/use-cases';
import { UploadSingleFileUseCase } from 'src/core/modules/s3/use-cases';
import { FindByIdCompanyUseCase } from 'src/core/modules/company/use-cases';

@Injectable()
export class CreateStoreUseCase
  implements
    UseCaseBase<CreateStoreDto & { file?: Express.Multer.File }, StoreEntity>
{
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly createPageUseCase: CreatePageUseCase,
    private readonly uploadSingleFileUseCase: UploadSingleFileUseCase,
    private readonly findByIdCompanyUseCase: FindByIdCompanyUseCase,
  ) {}

  async execute({
    file,
    ...data
  }: CreateStoreDto & { file?: Express.Multer.File }): Promise<StoreEntity> {
    const company = await this.findByIdCompanyUseCase.execute(data.companyId);

    const logo =
      file &&
      (await this.uploadSingleFileUseCase.execute({
        file,
        path: 'store/logo',
      }));

    const store = await this.storeRepository.create({
      ...data,
      logo,
      companyId: company.id,
    });

    await this.createPageUseCase.execute({
      storeId: store.id,
      title: 'Moda Top por um preço top!',
      description:
        'Vendemos apenas os produtos mais exclusivos e de alta qualidade para você. Somos os melhores, então venha comprar conosco.',
    });

    return store;
  }
}
