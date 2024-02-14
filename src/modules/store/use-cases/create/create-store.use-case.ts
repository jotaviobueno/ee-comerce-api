import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { CreateStoreDto } from 'src/domain/dtos';
import { StoreEntity } from 'src/domain/entities';
import { FindByIdUserUseCase } from 'src/modules/user/use-cases';
import { StoreRepository } from '../../store.repository';

@Injectable()
export class CreateStoreUseCase
  implements UseCaseBase<CreateStoreDto, StoreEntity>
{
  constructor(
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
    private readonly storeRepository: StoreRepository,
  ) {}

  async execute(data: CreateStoreDto): Promise<StoreEntity> {
    const user = await this.findByIdUserUseCase.execute(data.userId);

    const store = await this.storeRepository.create({
      ...data,
      userId: user.id,
    });

    return store;
  }
}
