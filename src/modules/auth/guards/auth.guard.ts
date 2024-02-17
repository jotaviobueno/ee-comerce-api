import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { environment } from '../../../config/environment';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators';
import { JwtService } from '@nestjs/jwt';
import { FindByIdUserUseCase } from 'src/modules/user/use-cases';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request.headers);

    if (!token)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: environment.JWT_SECRET,
      });

      const user = await this.findByIdUserUseCase.execute(payload.sub);

      request['user'] = user;
    } catch (e) {
      Logger.debug('FAILED TO AUTH', e.message);

      throw new HttpException('Failed to auth', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }

  private extractTokenFromHeader(
    headers?: Headers & { authorization?: string },
  ): string | undefined {
    if (!headers?.authorization) return undefined;

    const [type, authorization] = headers.authorization.split(' ');

    return type === 'Bearer' ? authorization : undefined;
  }
}
