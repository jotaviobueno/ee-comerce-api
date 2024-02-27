import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserCompanyDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  companyId: string;
}
