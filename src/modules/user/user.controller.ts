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
} from '@nestjs/common';
import {
  CreateUserDto,
  QueryParamsDto,
  UpdateUserDto,
} from '../../domain/dtos';
import {
  CreateUserUseCase,
  FindAllUserUseCase,
  FindByIdUserUseCase,
  SoftDeleteUserUseCase,
  UpdateUserUseCase,
} from './use-cases';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { IsPublic } from '../auth/decorators';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUserUseCase: FindAllUserUseCase,
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
    private readonly softDeleteUserUseCase: SoftDeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  @IsPublic()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.findAllUserUseCase.execute(queryParamsDto);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  findById(@Param('id') id: string) {
    return this.findByIdUserUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute({ ...updateUserDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softDeleteUserUseCase.execute(id);
  }
}
