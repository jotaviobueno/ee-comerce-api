import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateSkuDto, QueryParamsDto, UpdateSkuDto } from 'src/domain/dtos';
import { CreateSkuUseCase } from './use-cases/create/create-sku.use-case';
import { FindAllSkuUseCase, UpdateSkuUseCase } from './use-cases';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('sku')
export class SkuController {
  constructor(
    private readonly createSkuUseCase: CreateSkuUseCase,
    private readonly findAllSkuUseCase: FindAllSkuUseCase,
    private readonly updateSkuUseCase: UpdateSkuUseCase,
  ) {}

  @Post()
  create(@Body() createSkuDto: CreateSkuDto) {
    return this.createSkuUseCase.execute(createSkuDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.findAllSkuUseCase.execute(queryParamsDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkuDto: UpdateSkuDto) {
    return this.updateSkuUseCase.execute({ ...updateSkuDto, id });
  }
}
