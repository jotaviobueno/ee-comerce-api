import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { SectionTypeEntity } from 'src/domain/entities';
import { SectionTypeRepository } from '../../section-type.repository';

@Injectable()
export class FindByIdSectionTypeUseCase
  implements UseCaseBase<string, SectionTypeEntity>
{
  constructor(private readonly sectionTypeRepository: SectionTypeRepository) {}

  async execute(data: string): Promise<SectionTypeEntity> {
    const sectionType = await this.sectionTypeRepository.findById(data);

    if (!sectionType)
      throw new HttpException('Section type not found', HttpStatus.NOT_FOUND);

    return sectionType;
  }
}
