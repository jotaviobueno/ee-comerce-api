import { IsOptional, IsString, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchProductDto extends QueryParamsDto {
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsUUID()
  brandId?: string;

  @IsString()
  @IsOptional()
  q?: string;
}
