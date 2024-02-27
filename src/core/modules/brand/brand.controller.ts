import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
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
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'jpg|webp|png|jpeg' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.createBrandUseCase.execute({ ...createBrandDto, file });
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
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'jpg|webp|png|jpeg' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.updateBrandUseCase.execute({ ...updateBrandDto, file, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softDeleteBrandUseCase.execute(id);
  }
}
