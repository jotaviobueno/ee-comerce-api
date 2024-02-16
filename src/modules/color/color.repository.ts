import { Injectable } from '@nestjs/common';
import { CreateColorDto, UpdateColorDto } from 'src/domain/dtos';
import { ColorEntity, QueryBuilderEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class ColorRepository extends RepositoryFactory<
  ColorEntity,
  CreateColorDto,
  UpdateColorDto
> {
  constructor() {
    super('color');
  }

  findById(id: string): Promise<ColorEntity | null> {
    return this.prismaService.color.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll(query: QueryBuilderEntity): Promise<ColorEntity[]> {
    return this.prismaService.color.findMany(query);
  }
}
