import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateSkuDto } from './create-sku.dto';

export class UpdateSkuDto extends PartialType(
  OmitType(CreateSkuDto, ['productId']),
) {
  id?: string;
}
