import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CreateAuthUseCase } from './use-cases';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/config';

export const authModuleMock = {
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: environment.JWT_SECRET,
      signOptions: { expiresIn: '20d' },
    }),
  ],
  controllers: [AuthController],
  providers: [CreateAuthUseCase],
};

@Module(authModuleMock)
export class AuthModule {}
