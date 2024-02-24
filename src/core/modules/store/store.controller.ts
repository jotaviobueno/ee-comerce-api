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
  CreateStoreDto,
  QueryParamsDto,
  SearchProductDto,
  UpdateStoreDto,
} from 'src/domain/dtos';
import {
  CreateStoreUseCase,
  FindByIdStoreUseCase,
  UpdateStoreUseCase,
  SoftDeleteStoreUseCase,
  FindAllProductsByStoreIdUseCase,
  FindAllCategoriesByStoreIdUseCase,
} from './use-cases';
import { IsPublic } from '../auth/decorators';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('store')
export class StoreController {
  constructor(
    private readonly createStoreUseCase: CreateStoreUseCase,
    private readonly findByIdStoreUseCase: FindByIdStoreUseCase,
    private readonly updateStoreUseCase: UpdateStoreUseCase,
    private readonly softDeleteStoreUseCase: SoftDeleteStoreUseCase,
    private readonly findAllProductsByStoreIdUseCase: FindAllProductsByStoreIdUseCase,
    private readonly findAllCategoriesByStoreIdUseCase: FindAllCategoriesByStoreIdUseCase,
  ) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.createStoreUseCase.execute(createStoreDto);
  }

  @Get(':id/products')
  @IsPublic()
  findAllProductsByStoreId(
    @Query() queryParams: SearchProductDto,
    @Param('id') id: string,
  ) {
    return this.findAllProductsByStoreIdUseCase.execute({
      ...queryParams,
      storeId: id,
    });
  }

  @Get(':id/categories')
  @IsPublic()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  findAllCategoriesByStoreId(
    @Query() queryParams: QueryParamsDto,
    @Param('id') id: string,
  ) {
    return this.findAllCategoriesByStoreIdUseCase.execute({
      ...queryParams,
      storeId: id,
    });
  }

  @Get(':id')
  @IsPublic()
  findById(@Param('id') id: string) {
    return this.findByIdStoreUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.updateStoreUseCase.execute({ ...updateStoreDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softDeleteStoreUseCase.execute(id);
  }
}
