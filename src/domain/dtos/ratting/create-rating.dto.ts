import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateRatingDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(55)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  @MaxLength(500)
  description: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  stars: number;

  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
