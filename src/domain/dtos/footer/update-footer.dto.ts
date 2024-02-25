import { PartialType } from '@nestjs/mapped-types';
import { CreateFooterDto } from './create-footer.dto';

export class UpdateFooterDto extends PartialType(CreateFooterDto) {
  id?: string;
}
