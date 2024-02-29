import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/domain/dtos';
import {
  CreateProductUseCase,
  FindByIdProductUseCase,
  SoftDeleteProductUseCase,
  UpdateProductUseCase,
} from './use-cases';
import { IsPublic } from '../auth/decorators';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findByIdProductUseCase: FindByIdProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly softDeleteProductUseCase: SoftDeleteProductUseCase,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.createProductUseCase.execute(createProductDto);
  }

  @Get(':id')
  @IsPublic()
  findById(@Param('id') id: string) {
    return this.findByIdProductUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.updateProductUseCase.execute({ ...updateProductDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softDeleteProductUseCase.execute(id);
  }
}
