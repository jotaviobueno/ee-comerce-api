import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { SKU_SIZE_ENUM } from 'src/domain/enums';

export class CreateSkuDto {
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @IsNotEmpty()
  length: number;

  @IsNumber()
  @IsNotEmpty()
  height: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsEnum(SKU_SIZE_ENUM)
  @IsNotEmpty()
  size: SKU_SIZE_ENUM;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(55)
  batch: string;

  @IsUUID()
  @IsOptional()
  colorId?: string;

  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  costPrice: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;
}
