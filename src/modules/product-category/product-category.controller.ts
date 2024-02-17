import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import {
  CreateProductCategoryDto,
  UpdateProductCategoryDto,
} from 'src/domain/dtos';
import {
  CreateProductCategoryUseCase,
  FindByIdProductCategoryUseCase,
  UpdateProductCategoryUseCase,
} from './use-cases';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly createProductCategoryUseCase: CreateProductCategoryUseCase,
    private readonly findByIdProductCategoryUseCase: FindByIdProductCategoryUseCase,
    private readonly updateProductCategoryUseCase: UpdateProductCategoryUseCase,
  ) {}

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.createProductCategoryUseCase.execute(createProductCategoryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findByIdProductCategoryUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.updateProductCategoryUseCase.execute({
      ...updateProductCategoryDto,
      id,
    });
  }
}
