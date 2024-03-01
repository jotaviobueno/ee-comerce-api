import { IsOptional, IsString } from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchStoreDto extends QueryParamsDto {
  @IsOptional()
  @IsString()
  q?: string;
}
