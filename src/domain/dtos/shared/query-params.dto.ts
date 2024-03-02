import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class QueryParamsDto {
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => +value)
  page: number = 1;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  pageSize: number = 200;
}
