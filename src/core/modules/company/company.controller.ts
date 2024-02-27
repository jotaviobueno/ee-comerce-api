import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto } from 'src/domain/dtos/company';
import {
  CreateCompanyUseCase,
  FindByIdCompanyUseCase,
  SoftDeleteCompanyUseCase,
  UpdateCompanyUsecase,
} from './use-cases';
import { CurrentUser } from '../user/decorators';
import { UserEntity } from 'src/domain/entities';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly findByIdCompanyUseCase: FindByIdCompanyUseCase,
    private readonly softDeleteCompanyUseCase: SoftDeleteCompanyUseCase,
    private readonly updateCompanyUsecase: UpdateCompanyUsecase,
  ) {}

  @Post()
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.createCompanyUseCase.execute({
      ...createCompanyDto,
      userId: user.id,
    });
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.findByIdCompanyUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.updateCompanyUsecase.execute({ ...updateCompanyDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softDeleteCompanyUseCase.execute(id);
  }
}
