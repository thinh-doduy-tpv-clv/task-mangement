import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const type = context.getType();
    console.log('type: ', type);
    const prefix = 'Bearer ';
    let header;
    if (type === 'rpc') {
      const metadata = context.getArgByIndex(1); // metadata
      console.log('metadata: ', metadata);
      if (!metadata) {
        return false;
      }
      header = metadata.get('authorization')[0];
    }
    console.log('header: ', header);
    if (!header || !header.includes(prefix)) {
      throw new RpcException('Testy');
    }
    const token = header.slice(header.indexOf(' ') + 1);
    try {
      await this.jwtService.verifyAsync(token, {
        secret: '123456',
      });
      console.log('OK - ACCESS GRANTED');
      return true;
    } catch (e) {
      return false;
    }
  }
}
