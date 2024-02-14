import { Inject } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

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

  update({ id, ...data }: J & { id: string }): Promise<K> {
    return this.prismaService[this.model].update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<K> {
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
