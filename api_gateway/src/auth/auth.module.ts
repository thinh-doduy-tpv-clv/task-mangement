import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/constants';
import { AUTH_PACKAGE_NAME } from 'src/types/auth';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:9001',
          package: AUTH_PACKAGE_NAME,
          protoPath: 'src/proto/auth.proto',
        },
      },
    ]),
  ],
  providers: [AuthService, AuthResolver, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
