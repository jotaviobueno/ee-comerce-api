import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCouponDto, UpdateCouponDto } from 'src/domain/dtos';
import {
  CreateCouponUseCase,
  FindByIdCouponUseCase,
  SoftDeleteCouponUseCase,
  UpdateCouponUseCase,
} from './use-cases';

@Controller('coupon')
export class CouponController {
  constructor(
    private readonly createCouponUseCase: CreateCouponUseCase,
    private readonly findByIdCouponUseCase: FindByIdCouponUseCase,
    private readonly softDeleteCouponUseCase: SoftDeleteCouponUseCase,
    private readonly updateCouponUseCase: UpdateCouponUseCase,
  ) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.createCouponUseCase.execute(createCouponDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.findByIdCouponUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.updateCouponUseCase.execute({ ...updateCouponDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softDeleteCouponUseCase.execute(id);
  }
}
