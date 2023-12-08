import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './entities/user.entity';

import {
  CreateUserDto,
  UpdateUserDto,
  FindOneUserDto,
  Users as UsersProto,
  User as UserProto,
  LoginRequestDto,
  RegisterRequestDto,
  RefreshTokenRequestDto,
} from './types/auth';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<UserProto>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(registerRequestDto: RegisterRequestDto) {
    const hashPassword = await this.hashPassword(registerRequestDto.password);
    const result = await this.authRepository.create({
      ...registerRequestDto,
      password: hashPassword,
    });
    return await this.authRepository.save(result);
  }
  async login(loginRequestDto: LoginRequestDto) {
    const user = await this.authRepository.findOne({
      where: { username: loginRequestDto.username },
    });
    if (!user) {
      throw new HttpException(
        'Username is not exist ',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const checkPass = bcrypt.compareSync(
      loginRequestDto.password,
      user.password,
    );
    if (!checkPass) {
      throw new HttpException(
        'Password is not correct ',
        HttpStatus.UNAUTHORIZED,
      );
    }
    //Generate access_token and refresh_token
    const payload = { id: user.id, email: user.email };
    const token = await this.generateToken(payload);
    //Update refresh token into database
    await this.authRepository.update(
      {
        email: user.email,
      },
      { refreshToken: token.refreshToken },
    );
    return token;
  }
  async refreshToken(refreshTokenRequestDto: RefreshTokenRequestDto) {
    try {
      const verify = await this.jwtService.verifyAsync(
        refreshTokenRequestDto.refreshToken,
        {
          secret: this.configService.get<string>('SECRET'),
        },
      );
      const checkExistToken = await this.authRepository.findOneBy({
        email: verify.email,
        refreshToken: refreshTokenRequestDto.refreshToken,
      });
      if (checkExistToken) {
        const token = await this.generateToken({
          id: verify.id,
          email: verify.email,
        });
        await this.authRepository.update(
          {
            email: verify.email,
          },
          { refreshToken: token.refreshToken },
        );
        return token;
      } else {
        throw new HttpException(
          'Refresh token is not valid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  private async generateToken(payload: { id: number; email: string }) {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('SECRET'),
      expiresIn: this.configService.get<string>('EXP_IN_REFRESH_TOKEN'),
    });
    return { accessToken, refreshToken };
  }
  private async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
