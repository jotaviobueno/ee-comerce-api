import { Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { CreateSectionTypeDto } from 'src/domain/dtos';
import { SectionTypeEntity } from 'src/domain/entities';
import { SectionTypeRepository } from '../../section-type.repository';

@Injectable()
export class CreateSectionTypeUseCase
  implements UseCaseBase<CreateSectionTypeDto, SectionTypeEntity>
{
  constructor(private readonly sectionTypeRepository: SectionTypeRepository) {}

  async execute(data: CreateSectionTypeDto): Promise<SectionTypeEntity> {
    const sectionType = await this.sectionTypeRepository.create(data);

    return sectionType;
  }
}
