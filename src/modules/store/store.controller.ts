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
  CreateStoreDto,
  QueryParamsDto,
  UpdateStoreDto,
} from 'src/domain/dtos';
import {
  CreateStoreUseCase,
  FindAllStoreUseCase,
  FindByIdStoreUseCase,
  UpdateStoreUseCase,
  SoftDeleteStoreUseCase,
} from './use-cases';

@Controller('store')
export class StoreController {
  constructor(
    private readonly createStoreUseCase: CreateStoreUseCase,
    private readonly findAllStoreUseCase: FindAllStoreUseCase,
    private readonly findByIdStoreUseCase: FindByIdStoreUseCase,
    private readonly updateStoreUseCase: UpdateStoreUseCase,
    private readonly softDeleteStoreUseCase: SoftDeleteStoreUseCase,
  ) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.createStoreUseCase.execute(createStoreDto);
  }

  @Get()
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.findAllStoreUseCase.execute(queryParams);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
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