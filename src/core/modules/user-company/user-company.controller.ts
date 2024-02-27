import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserCompanyDto, UpdateUserCompanyDto } from 'src/domain/dtos';
import {
  CreateUserCompanyUseCase,
  FindByIdUserCompanyUseCase,
  SoftDeleteUserCompanyUseCase,
  UpdateUserCompanyUseCase,
} from './use-cases';

@Controller('user-company')
export class UserCompanyController {
  constructor(
    private readonly createUserCompanyUseCase: CreateUserCompanyUseCase,
    private readonly findByIdUserCompanyUseCase: FindByIdUserCompanyUseCase,
    private readonly updateUserCompanyUseCAse: UpdateUserCompanyUseCase,
    private readonly softDeleteUserCompanyUseCase: SoftDeleteUserCompanyUseCase,
  ) {}

  @Post()
  create(@Body() createUserCompanyDto: CreateUserCompanyDto) {
    return this.createUserCompanyUseCase.execute(createUserCompanyDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.findByIdUserCompanyUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserCompanyDto: UpdateUserCompanyDto,
  ) {
    return this.updateUserCompanyUseCAse.execute({
      ...updateUserCompanyDto,
      id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softDeleteUserCompanyUseCase.execute(id);
  }
}
