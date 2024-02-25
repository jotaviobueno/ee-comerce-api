import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { FooterEntity } from 'src/domain/entities';
import { FooterRepository } from '../../footer.repository';

@Injectable()
export class FindByIdFooterUseCase
  implements UseCaseBase<string, FooterEntity>
{
  constructor(private readonly footerRepository: FooterRepository) {}

  async execute(data: string): Promise<FooterEntity> {
    const footer = await this.footerRepository.findById(data);

    if (!footer)
      throw new HttpException('Footer not found', HttpStatus.NOT_FOUND);

    return footer;
  }
}
