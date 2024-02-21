import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateColorDto, QueryParamsDto } from 'src/domain/dtos';
import { CreateColorUseCase, FindAllColorUseCase } from './use-cases';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('color')
export class ColorController {
  constructor(
    private readonly createColorUseCase: CreateColorUseCase,
    private readonly findAllColorUseCase: FindAllColorUseCase,
  ) {}

  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.createColorUseCase.execute(createColorDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.findAllColorUseCase.execute(queryParamsDto);
  }
}
