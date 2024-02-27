import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsCnpj } from 'src/common/validators';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  fantasyName?: string;

  @IsCnpj()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString().replace(/\D/g, ''))
  cnpj: string;
}
