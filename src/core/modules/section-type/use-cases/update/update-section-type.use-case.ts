import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UpdateSectionTypeDto } from 'src/domain/dtos';
import { SectionTypeEntity } from 'src/domain/entities';
import { FindByIdSectionTypeUseCase } from '../find-by-id';
import { SectionTypeRepository } from '../../section-type.repository';

@Injectable()
export class UpdaateSectionTypeUseCase
  implements UseCaseBase<UpdateSectionTypeDto, SectionTypeEntity>
{
  constructor(
    private readonly findByIdSectionTypeUseCase: FindByIdSectionTypeUseCase,
    private readonly sectionTypeRepository: SectionTypeRepository,
  ) {}

  async execute(data: UpdateSectionTypeDto): Promise<SectionTypeEntity> {
    const sectionType = await this.findByIdSectionTypeUseCase.execute(data.id);

    const update = await this.sectionTypeRepository.update({
      ...data,
      id: sectionType.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
