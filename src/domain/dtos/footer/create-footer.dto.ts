import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateFooterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  href?: string;

  @IsUUID()
  @IsNotEmpty()
  pageId: string;

  @IsUUID()
  @IsOptional()
  parentId?: string;
}
