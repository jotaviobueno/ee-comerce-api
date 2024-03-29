import { Inject } from '@nestjs/common';
import { QueryBuilderEntity } from 'src/domain/entities';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

export class RepositoryFactory<K, T = void, J = void> {
  @Inject(PrismaService)
  public readonly prismaService: PrismaService;

  constructor(public model: string) {}

  create(data: T): Promise<K> {
    return this.prismaService[this.model].create({
      data: {
        ...data,
        deletedAt: null,
      },
    });
  }

  update({ id, ...data }: J & { id: string }): Promise<K | null> {
    return this.prismaService[this.model].update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  count({ where }: QueryBuilderEntity): Promise<number> {
    return this.prismaService[this.model].count({ where });
  }

  softDelete(id: string): Promise<K | null> {
    return this.prismaService[this.model].update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
