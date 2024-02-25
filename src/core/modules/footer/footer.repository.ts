import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateFooterDto } from 'src/domain/dtos';
import { UpdateFooterDto } from 'src/domain/dtos/footer/update-footer.dto';
import { FooterEntity } from 'src/domain/entities';

@Injectable()
export class FooterRepository extends RepositoryFactory<
  FooterEntity,
  CreateFooterDto,
  UpdateFooterDto
> {
  constructor() {
    super('footer');
  }

  findById(id: string): Promise<FooterEntity | null> {
    return this.prismaService.footer.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
