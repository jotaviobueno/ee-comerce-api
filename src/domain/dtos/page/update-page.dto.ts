import { IsOptional, IsString } from 'class-validator';

export class UpdatePageDto {
  id?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
