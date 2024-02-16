import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateSkuDto, QueryParamsDto } from 'src/domain/dtos';
import { CreateSkuUseCase } from './use-cases/create/create-sku.use-case';
import { FindAllSkuUseCase } from './use-cases';

@Controller('sku')
export class SkuController {
  constructor(
    private readonly createSkuUseCase: CreateSkuUseCase,
    private readonly findAllSkuUseCase: FindAllSkuUseCase,
  ) {}

  @Post()
  create(@Body() createSkuDto: CreateSkuDto) {
    return this.createSkuUseCase.execute(createSkuDto);
  }

  @Get()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.findAllSkuUseCase.execute(queryParamsDto);
  }
}
