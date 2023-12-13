import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const type = context.getType();
    const prefix = 'Bearer ';
    let header;
    if (type === 'rpc') {
      const metadata = context.getArgByIndex(1); // metadata
      if (!metadata) {
        return false;
      }
      header = metadata.get('Authorization')[0];
    }
    if (!header || !header.includes(prefix)) {
      throw new RpcException('Testy');
    }
    const token = header.slice(header.indexOf(' ') + 1);
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('SECRET'),
      });
      return true;
    } catch (e) {
      throw new RpcException({ isError: true, errorMsg: e.message });
      return false;
    }
  }
}
