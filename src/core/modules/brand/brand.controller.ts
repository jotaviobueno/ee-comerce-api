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
  CreateBrandDto,
  QueryParamsDto,
  UpdateBrandDto,
} from 'src/domain/dtos';
import {
  CreateBrandUseCase,
  FindAllBrandUseCase,
  FindByIdBrandUseCase,
  SoftDeleteBrandUseCase,
  UpdateBrandUseCase,
} from './use-cases';

@Controller('brand')
export class BrandController {
  constructor(
    private readonly createBrandUseCase: CreateBrandUseCase,
    private readonly findAllBrandUseCase: FindAllBrandUseCase,
    private readonly findByIdBrandUseCase: FindByIdBrandUseCase,
    private readonly softDeleteBrandUseCase: SoftDeleteBrandUseCase,
    private readonly updateBrandUseCase: UpdateBrandUseCase,
  ) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.createBrandUseCase.execute(createBrandDto);
  }

  @Get()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.findAllBrandUseCase.execute(queryParamsDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.findByIdBrandUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.updateBrandUseCase.execute({ ...updateBrandDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softDeleteBrandUseCase.execute(id);
  }
}
