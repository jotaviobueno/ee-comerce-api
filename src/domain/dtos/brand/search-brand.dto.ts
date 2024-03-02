import { IsOptional, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchBrandDto extends QueryParamsDto {
  @IsUUID()
  @IsOptional()
  storeId?: string;
}
