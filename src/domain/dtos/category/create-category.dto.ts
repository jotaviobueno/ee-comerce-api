import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(55)
  name: string;

  @IsUUID()
  @IsNotEmpty()
  storeId: string;
}
