import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsValidDate } from 'src/common/validators';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(55)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(3500)
  description?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(55)
  @Transform(({ value }) => value.replace(/\s/g, '').toUpperCase())
  code: string;

  @IsInt()
  @IsNotEmpty()
  discount: number;

  @IsNumber()
  @IsNotEmpty()
  maxUsages: number;

  @IsOptional()
  @IsNumber()
  maxUsagesPerUser?: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsDate()
  @IsValidDate()
  @IsOptional()
  fromAt?: Date;

  @IsDate()
  @IsOptional()
  toAt?: Date;

  @IsUUID()
  @IsNotEmpty()
  storeId: string;

  @IsUUID()
  @IsOptional()
  productId?: string;
}
