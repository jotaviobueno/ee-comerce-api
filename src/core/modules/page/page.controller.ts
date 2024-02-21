import {
  Controller,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UpdatePageUseCase } from './use-cases/update';
import { UpdatePageDto } from 'src/domain/dtos';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('page')
export class PageController {
  constructor(private readonly updatePageUseCase: UpdatePageUseCase) {}

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files', 5))
  update(
    @Param('id') id: string,
    @Body() updatePageDto: UpdatePageDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.updatePageUseCase.execute({ ...updatePageDto, id, files });
  }
}
