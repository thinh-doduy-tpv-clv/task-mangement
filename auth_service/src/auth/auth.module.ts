import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthValidator } from '../shared/services/auth-validator.service';
import { AuthResponse } from '../shared/untils';
import { CryptoService } from '../shared/services/crypto.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: '123456',
      signOptions: {
        expiresIn: '1m',
      },
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthValidator, AuthResponse, CryptoService],
  exports: [AuthService],
})
export class AuthModule {}
