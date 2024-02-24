import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/domain/dtos';
import {
  CreateCategoryUseCase,
  UpdateCategoryUseCase,
  FindByIdCategoryUseCase,
  SoftDeleteCategoryUseCase,
} from './use-cases';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly findByIdCategoryUseCase: FindByIdCategoryUseCase,
    private readonly softDeleteCategoryUseCase: SoftDeleteCategoryUseCase,
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(createCategoryDto);
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
