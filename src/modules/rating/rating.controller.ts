import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  CreateRatingUseCase,
  FindByIdRatingUseCase,
  SoftDeleteRatingUseCase,
  UpdateRatingUseCase,
} from './use-cases';
import { CreateRatingDto, UpdateRatingDto } from 'src/domain/dtos';

@Controller('rating')
export class RatingController {
  constructor(
    private readonly createRatingUseCase: CreateRatingUseCase,
    private readonly findByIdRatingUseCase: FindByIdRatingUseCase,
    private readonly softDeleteRatingUseCase: SoftDeleteRatingUseCase,
    private readonly updateRatingUseCase: UpdateRatingUseCase,
  ) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.createRatingUseCase.execute(createRatingDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.findByIdRatingUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.updateRatingUseCase.execute({ ...updateRatingDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softDeleteRatingUseCase.execute(id);
  }
}
