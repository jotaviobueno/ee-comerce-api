import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import {
  CreateSectionTypeDto,
  QueryParamsDto,
  UpdateSectionTypeDto,
} from 'src/domain/dtos';
import {
  CreateSectionTypeUseCase,
  FindAllSectionTypeUseCase,
  SoftDeleteSectionTypeUseCase,
  UpdaateSectionTypeUseCase,
} from './use-cases';

@Controller('section-type')
export class SectionTypeController {
  constructor(
    private readonly createSectionTypeUseCase: CreateSectionTypeUseCase,
    private readonly findAllSectionTypeUseCase: FindAllSectionTypeUseCase,
    private readonly softDeleteSectionTypeUseCase: SoftDeleteSectionTypeUseCase,
    private readonly updaateSectionTypeUseCase: UpdaateSectionTypeUseCase,
  ) {}

  @Post()
  create(@Body() createSectionTypeDto: CreateSectionTypeDto) {
    return this.createSectionTypeUseCase.execute(createSectionTypeDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.findAllSectionTypeUseCase.execute(queryParamsDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSectionTypeDto: UpdateSectionTypeDto,
  ) {
    return this.updaateSectionTypeUseCase.execute({
      ...updateSectionTypeDto,
      id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softDeleteSectionTypeUseCase.execute(id);
  }
}
