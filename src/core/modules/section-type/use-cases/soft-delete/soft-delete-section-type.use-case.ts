import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { SectionTypeRepository } from '../../section-type.repository';
import { FindByIdSectionTypeUseCase } from '../find-by-id';

@Injectable()
export class SoftDeleteSectionTypeUseCase
  implements UseCaseBase<string, boolean>
{
  constructor(
    private readonly sectionTypeRepository: SectionTypeRepository,
    private readonly findByIdSectionTypeUseCase: FindByIdSectionTypeUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const sectionType = await this.findByIdSectionTypeUseCase.execute(data);

    const remove = await this.sectionTypeRepository.softDelete(sectionType.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
