import { Controller } from '@nestjs/common';
import {
  CreateUserDto,
  Empty,
  FindOneUserDto,
  AuthServiceControllerMethods,
  UpdateUserDto,
  AuthServiceController,
  LoginRequestDto,
  RegisterRequestDto,
  ForgotPasswordRequestDto,
  LoginResponseDto,
  RegisterResponseDto,
  User as UserProto,
  RefreshTokenRequestDto,
} from './types/auth';
import { AuthService } from './auth.service';
@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async register(registerRequestDto: RegisterRequestDto): Promise<UserProto> {
    return this.authService.register(registerRequestDto);
  }
  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.authService.login(loginRequestDto);
  }
  async refreshToken(
    refreshTokenRequestDto: RefreshTokenRequestDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.refreshToken(refreshTokenRequestDto);
  }

  async createUser(request: CreateUserDto) {
    return null;
  }
  async findAllUser(request: Empty) {
    return null;
  }

  async findOneUser(request: FindOneUserDto) {
    return null;
  }

  async updateUser(request: UpdateUserDto) {
    return null;
  }

  async removeUser(request: FindOneUserDto) {
    return null;
  }

  async forgotPassword(request: ForgotPasswordRequestDto) {
    return null;
  }
}
