import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateStoreDto {
  @MinLength(3)
  @MaxLength(55)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  companyId: string;
}
