import { Controller, UseGuards } from '@nestjs/common';
import {
  ICreateUserDto,
  IFindOneUserDto,
  AuthServiceControllerMethods,
  IUpdateUserDto,
  AuthServiceController,
  IRegisterRequestDto,
  IForgotPasswordRequestDto,
  IRefreshTokenRequestDto,
  IUsers as UsersProto,
  IAuthReponse,
} from '../shared/types/auth';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Metadata } from '@grpc/grpc-js';
import { LoginRequestDtoValidation } from './dto/login-request.dto.validation';
import { RpcException } from '@nestjs/microservices';
import { AuthValidator } from '../shared/services/auth-validator.service';
import { AuthResponse } from '../shared/untils';
@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(
    private readonly authService: AuthService,
    private readonly authValidator: AuthValidator,
    private readonly authResponse: AuthResponse,
  ) {}

  async register(
    registerRequestDto: IRegisterRequestDto,
  ): Promise<IAuthReponse> {
    if (registerRequestDto.username)
      registerRequestDto.username = registerRequestDto.username
        ?.trim()
        .toLowerCase();

    const authErrorResponse = await this.authValidator.checkValidRegister(
      registerRequestDto,
    );
    if (authErrorResponse.isError) {
      return this.authResponse.generateAuthResponse(
        null,
        {
          errorCode: authErrorResponse.errorCode,
          errorMsg: authErrorResponse.errorMessage,
        },
        true,
      );
    }
    return this.authService.register(registerRequestDto);
  }
  async login(
    loginRequestDto: LoginRequestDtoValidation,
  ): Promise<IAuthReponse> {
    if (loginRequestDto.username)
      loginRequestDto.username = loginRequestDto.username?.trim().toLowerCase();
    return await this.authService.login(loginRequestDto);
  }
  async refreshToken(
    refreshTokenRequestDto: IRefreshTokenRequestDto,
  ): Promise<IAuthReponse> {
    return await this.authService.refreshToken(refreshTokenRequestDto);
  }

  async findOneUser(request: IFindOneUserDto): Promise<IAuthReponse> {
    return await this.authService.findOneUser(request.id);
  }

  @UseGuards(AuthGuard)
  async updateUser(request: IUpdateUserDto) {
    //todo
    return null;
  }

  async forgotPassword(request: IForgotPasswordRequestDto) {
    return null;
  }
  async createUser(request: ICreateUserDto) {
    return null;
  }
  async findAllUser(metadata: Metadata): Promise<UsersProto> {
    return this.authService.findAllUser(metadata);
  }
  async removeUser(request: IFindOneUserDto) {
    return null;
  }
}
