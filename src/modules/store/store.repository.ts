import { Injectable } from '@nestjs/common';
import { CreateStoreDto, UpdateStoreDto } from 'src/domain/dtos';
import { QueryBuilderEntity, StoreEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class StoreRepository extends RepositoryFactory<
  StoreEntity,
  CreateStoreDto,
  UpdateStoreDto
> {
  constructor() {
    super('store');
  }

  findAll(query: QueryBuilderEntity): Promise<StoreEntity[]> {
    return this.prismaService.store.findMany(query);
  }

  findById(id: string): Promise<StoreEntity> {
    return this.prismaService.store.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
