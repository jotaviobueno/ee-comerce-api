import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateAuthDto } from '../../domain/dtos';
import { UserEntity } from 'src/domain/entities';
import { IsPublic } from './decorators';
import { CreateAuthUseCase } from './use-cases';
import { CurrentUser } from '../user/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly createAuthUseCase: CreateAuthUseCase) {}

  @Post()
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.createAuthUseCase.execute(createAuthDto);
  }

  @Get('/who-am-i')
  whoAmI(@CurrentUser() user: UserEntity) {
    return user;
  }
}
