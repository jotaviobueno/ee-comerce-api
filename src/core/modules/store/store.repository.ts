import { Injectable } from '@nestjs/common';
import { CreateStoreDto, UpdateStoreDto } from 'src/domain/dtos';
import { StoreEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/common/factories';

@Injectable()
export class StoreRepository extends RepositoryFactory<
  StoreEntity,
  CreateStoreDto,
  UpdateStoreDto
> {
  constructor() {
    super('store');
  }

  create(data: CreateStoreDto & { logo?: string }): Promise<StoreEntity> {
    return this.prismaService.store.create({
      data: {
        ...data,
        deletedAt: null,
      },
    });
  }

  update({
    id,
    ...data
  }: UpdateStoreDto & { id: string; logo?: string }): Promise<StoreEntity> {
    return this.prismaService.store.update({
      where: { id },
      data,
    });
  }

  findById(id: string): Promise<StoreEntity | null> {
    return this.prismaService.store.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        page: {
          include: {
            footers: {
              where: {
                parentId: null,
                deletedAt: null,
              },
              include: {
                children: true,
              },
            },
          },
        },
      },
    });
  }
}
