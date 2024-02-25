import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateFooterDto, UpdateFooterDto } from 'src/domain/dtos';
import {
  CreateFooterUseCase,
  FindByIdFooterUseCase,
  SoftDeleteFooterUseCase,
  UpdateFooterUseCase,
} from './use-cases';

@Controller('footer')
export class FooterController {
  constructor(
    private readonly findByIdFooterUseCase: FindByIdFooterUseCase,
    private readonly createFooterUseCase: CreateFooterUseCase,
    private readonly updateFooterUseCase: UpdateFooterUseCase,
    private readonly softDeleteFooterUseCase: SoftDeleteFooterUseCase,
  ) {}

  @Post()
  create(@Body() createFooterDto: CreateFooterDto) {
    return this.createFooterUseCase.execute(createFooterDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.findByIdFooterUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFooterDto: UpdateFooterDto) {
    return this.updateFooterUseCase.execute({ ...updateFooterDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softDeleteFooterUseCase.execute(id);
  }
}
