import { Injectable } from '@nestjs/common';
import { CreateSkuDto } from 'src/domain/dtos';
import { QueryBuilderEntity, SkuEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class SkuRepository extends RepositoryFactory<SkuEntity, CreateSkuDto> {
  constructor() {
    super('sku');
  }

  findAll(query: QueryBuilderEntity): Promise<SkuEntity[]> {
    return this.prismaService.sku.findMany(query);
  }
}
