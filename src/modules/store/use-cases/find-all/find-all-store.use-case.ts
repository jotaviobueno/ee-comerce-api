import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/domain/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { StoreEntity } from 'src/domain/entities';
import { StoreRepository } from '../../store.repository';
import { QueryBuilder } from 'src/domain/utils';

@Injectable()
export class FindAllStoreUseCase
  implements UseCaseBase<QueryParamsDto, StoreEntity[]>
{
  constructor(private readonly storeRepository: StoreRepository) {}

  async execute(data: QueryParamsDto): Promise<StoreEntity[]> {
    const query = new QueryBuilder(data).pagination().handle();

    const stores = await this.storeRepository.findAll(query);

    return stores;
  }
}
