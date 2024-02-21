import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { ColorRepository } from '../../color.repository';
import { FindByIdColorUseCase } from '../find-by-id';

@Injectable()
export class SoftDeleteColorUseCase implements UseCaseBase<string, boolean> {
  constructor(
    private readonly colorRepository: ColorRepository,
    private readonly findByIdColorUseCase: FindByIdColorUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const color = await this.findByIdColorUseCase.execute(data);

    const remove = await this.colorRepository.softDelete(color.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
