import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSkuDto {
  @IsString()
  @IsNotEmpty()
  width: string;

  @IsString()
  @IsNotEmpty()
  length: string;

  @IsString()
  @IsNotEmpty()
  height: string;

  @IsString()
  @IsNotEmpty()
  weight: string;

  @IsNumber()
  @IsNotEmpty()
  costPrice: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  upc: string | null;

  @IsString()
  @IsNotEmpty()
  ean: string | null;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsUUID()
  @IsOptional()
  colorId: string | null;
}
