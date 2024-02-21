import { Injectable } from '@nestjs/common';
import { CreateSkuDto, UpdateSkuDto } from 'src/domain/dtos';
import { QueryBuilderEntity, SkuEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/common/factories';

@Injectable()
export class SkuRepository extends RepositoryFactory<
  SkuEntity,
  CreateSkuDto,
  UpdateSkuDto
> {
  constructor() {
    super('sku');
  }

  findAll(query: QueryBuilderEntity): Promise<SkuEntity[]> {
    return this.prismaService.sku.findMany(query);
  }

  findById(id: string): Promise<SkuEntity | null> {
    return this.prismaService.sku.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
