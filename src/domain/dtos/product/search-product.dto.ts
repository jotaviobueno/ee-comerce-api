import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { Transform } from 'class-transformer';

export class SearchProductDto extends QueryParamsDto {
  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  @Transform(({ value }) => value.split(','))
  categoryId?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  @Transform(({ value }) => value.split(','))
  brandId?: string[];

  @IsOptional()
  @IsUUID()
  colorId?: string;

  @IsString()
  @IsOptional()
  width?: string;

  @IsString()
  @IsOptional()
  length?: string;

  @IsString()
  @IsOptional()
  height?: string;

  @IsString()
  @IsOptional()
  weight?: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsString()
  @IsOptional()
  q?: string;
}
