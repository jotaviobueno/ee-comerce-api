import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import {
  CreateStoreDto,
  QueryParamsDto,
  SearchProductDto,
  UpdateStoreDto,
} from 'src/domain/dtos';
import {
  CreateStoreUseCase,
  UpdateStoreUseCase,
  SoftDeleteStoreUseCase,
  FindAllProductsByStoreIdUseCase,
  FindAllCategoriesByStoreIdUseCase,
  FindByIdStorePopulateUseCase,
} from './use-cases';
import { IsPublic } from '../auth/decorators';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('store')
export class StoreController {
  constructor(
    private readonly createStoreUseCase: CreateStoreUseCase,
    private readonly findByIdStorePopulateUseCase: FindByIdStorePopulateUseCase,
    private readonly updateStoreUseCase: UpdateStoreUseCase,
    private readonly softDeleteStoreUseCase: SoftDeleteStoreUseCase,
    private readonly findAllProductsByStoreIdUseCase: FindAllProductsByStoreIdUseCase,
    private readonly findAllCategoriesByStoreIdUseCase: FindAllCategoriesByStoreIdUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createStoreDto: CreateStoreDto,
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
    return this.createStoreUseCase.execute({
      file,
      ...createStoreDto,
    });
  }

  @Get(':id/products')
  @IsPublic()
  findAllProductsByStoreId(
    @Query() queryParams: SearchProductDto,
    @Param('id') id: string,
  ) {
    return this.findAllProductsByStoreIdUseCase.execute({
      ...queryParams,
      storeId: id,
    });
  }

  @Get(':id/categories')
  @IsPublic()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  findAllCategoriesByStoreId(
    @Query() queryParams: QueryParamsDto,
    @Param('id') id: string,
  ) {
    return this.findAllCategoriesByStoreIdUseCase.execute({
      ...queryParams,
      storeId: id,
    });
  }

  @Get(':id')
  @IsPublic()
  findById(@Param('id') id: string) {
    return this.findByIdStorePopulateUseCase.execute(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
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
    return this.updateStoreUseCase.execute({ ...updateStoreDto, id, file });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softDeleteStoreUseCase.execute(id);
  }
}
