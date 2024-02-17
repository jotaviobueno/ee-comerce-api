import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProductCategoryDto {
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
