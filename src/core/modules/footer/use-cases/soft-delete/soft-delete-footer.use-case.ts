import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { FindByIdFooterUseCase } from '../find-by-id';
import { FooterRepository } from '../../footer.repository';

@Injectable()
export class SoftDeleteFooterUseCase implements UseCaseBase<string, boolean> {
  constructor(
    private readonly findByIdFooterUseCase: FindByIdFooterUseCase,
    private readonly footerRepository: FooterRepository,
  ) {}

  async execute(data: string): Promise<boolean> {
    const footer = await this.findByIdFooterUseCase.execute(data);

    const remove = await this.footerRepository.softDelete(footer.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
