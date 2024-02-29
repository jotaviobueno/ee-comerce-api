import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateColorDto } from './create-color.dto';

export class UpdateColorDto extends PartialType(
  OmitType(CreateColorDto, ['storeId']),
) {
  id?: string;
}
