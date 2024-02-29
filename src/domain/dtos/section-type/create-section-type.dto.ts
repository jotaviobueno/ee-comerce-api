import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSectionTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
