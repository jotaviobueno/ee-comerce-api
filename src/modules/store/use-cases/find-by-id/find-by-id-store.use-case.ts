import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { StoreEntity } from 'src/domain/entities';
import { StoreRepository } from '../../store.repository';

@Injectable()
export class FindByIdStoreUseCase implements UseCaseBase<string, StoreEntity> {
  constructor(private readonly storeRepository: StoreRepository) {}

  async execute(data: string): Promise<StoreEntity> {
    const store = await this.storeRepository.findById(data);

    if (!store)
      throw new HttpException('Store not found.', HttpStatus.NOT_FOUND);

    return store;
  }
}
