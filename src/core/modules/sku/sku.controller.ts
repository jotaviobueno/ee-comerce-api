import {
  Body,
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateSkuDto, QueryParamsDto, UpdateSkuDto } from 'src/domain/dtos';
import { CreateSkuUseCase } from './use-cases/create/create-sku.use-case';
import {
  FindAllSkuUseCase,
  SoftDeleteSkuUseCase,
  UpdateSkuUseCase,
} from './use-cases';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('sku')
export class SkuController {
  constructor(
    private readonly createSkuUseCase: CreateSkuUseCase,
    private readonly findAllSkuUseCase: FindAllSkuUseCase,
    private readonly updateSkuUseCase: UpdateSkuUseCase,
    private readonly softDeleteSkuUseCase: SoftDeleteSkuUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('files'))
  create(
    @Body() createSkuDto: CreateSkuDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1000 })],
        fileIsRequired: false,
      }),
    )
    files?: Express.Multer.File[],
  ) {
    return this.createSkuUseCase.execute({ ...createSkuDto, files });
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.findAllSkuUseCase.execute(queryParamsDto);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('files'))
  update(
    @Param('id') id: string,
    @Body() updateSkuDto: UpdateSkuDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1000 })],
        fileIsRequired: false,
      }),
    )
    files?: Express.Multer.File[],
  ) {
    return this.updateSkuUseCase.execute({ ...updateSkuDto, id, files });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softDeleteSkuUseCase.execute(id);
  }
}
