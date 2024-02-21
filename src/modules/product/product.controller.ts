import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateProductDto,
  QueryParamsDto,
  UpdateProductDto,
} from 'src/domain/dtos';
import {
  CreateProductUseCase,
  FindAllProductByStoreIdUseCase,
  FindByIdProductUseCase,
  SoftDeleteProductUseCase,
  UpdateProductUseCase,
} from './use-cases';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { IsPublic } from '../auth/decorators';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findByIdProductUseCase: FindByIdProductUseCase,
    private readonly findAllProductByStoreIdUseCase: FindAllProductByStoreIdUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly softDeleteProductUseCase: SoftDeleteProductUseCase,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.createProductUseCase.execute(createProductDto);
  }

  @Get('/store/:id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  @IsPublic()
  findAll(
    @Query() queryParamsDto: QueryParamsDto,
    @Param('id') storeId: string,
  ) {
    return this.findAllProductByStoreIdUseCase.execute({
      ...queryParamsDto,
      storeId,
    });
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
