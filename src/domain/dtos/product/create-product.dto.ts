import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  @MaxLength(4000)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsUUID()
  @IsOptional()
  brandId?: string;

  @IsUUID()
  @IsNotEmpty()
  storeId: string;
}
