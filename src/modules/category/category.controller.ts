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
  CreateCategoryDto,
  QueryParamsDto,
  UpdateCategoryDto,
} from 'src/domain/dtos';
import {
  CreateCategoryUseCase,
  FindAllCategoryUseCase,
  UpdateCategoryUseCase,
  FindByIdCategoryUseCase,
  SoftDeleteCategoryUseCase,
} from './use-cases';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly findAllCategoryUseCase: FindAllCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly findByIdCategoryUseCase: FindByIdCategoryUseCase,
    private readonly softDeleteCategoryUseCase: SoftDeleteCategoryUseCase,
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(createCategoryDto);
  }

  @Get()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.findAllCategoryUseCase.execute(queryParamsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findByIdCategoryUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.updateCategoryUseCase.execute({ ...updateCategoryDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softDeleteCategoryUseCase.execute(id);
  }
}
