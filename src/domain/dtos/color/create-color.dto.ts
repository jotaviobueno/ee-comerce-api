import { IsHexColor, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateColorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsHexColor()
  @IsNotEmpty()
  hex: string;

  @IsUUID()
  @IsNotEmpty()
  storeId: string;
}
