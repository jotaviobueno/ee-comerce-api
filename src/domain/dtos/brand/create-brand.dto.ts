import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  storeId: string;
}
