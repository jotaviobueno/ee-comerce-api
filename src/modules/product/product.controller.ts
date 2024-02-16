import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  CreateProductDto,
  QueryParamsDto,
  UpdateProductDto,
} from 'src/domain/dtos';
import {
  CreateProductUseCase,
  FindAllProductUseCase,
  FindByIdProductUseCase,
  SoftDeleteProductUseCase,
  UpdateProductUseCase,
} from './use-cases';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findByIdProductUseCase: FindByIdProductUseCase,
    private readonly findAllProductUseCase: FindAllProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly softDeleteProductUseCase: SoftDeleteProductUseCase,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.createProductUseCase.execute(createProductDto);
  }

  @Get()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.findAllProductUseCase.execute(queryParamsDto);
  }

  @Get(':id')
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
