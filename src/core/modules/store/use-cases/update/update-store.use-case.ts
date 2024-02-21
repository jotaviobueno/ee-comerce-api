import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UpdateStoreDto } from 'src/domain/dtos';
import { StoreEntity } from 'src/domain/entities';
import { StoreRepository } from '../../store.repository';
import { FindByIdStoreUseCase } from '../find-by-id';

@Injectable()
export class UpdateStoreUseCase
  implements UseCaseBase<UpdateStoreDto, StoreEntity>
{
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly findByIdStoreUseCase: FindByIdStoreUseCase,
  ) {}

  async execute(data: UpdateStoreDto): Promise<StoreEntity> {
    const store = await this.findByIdStoreUseCase.execute(data.id);

    const update = await this.storeRepository.update({ ...data, id: store.id });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
