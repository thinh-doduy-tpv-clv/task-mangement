import { Controller } from '@nestjs/common';
import {
  CreateUserDto,
  Empty,
  FindOneUserDto,
  AuthServiceControllerMethods,
  UpdateUserDto,
  AuthServiceController,
  AuthRequestDto,
  RegisterRequestDto,
  ForgotPasswordRequestDto,
} from './types/auth';
import { AuthService } from './auth.service';
@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async createUser(request: CreateUserDto) {
    return null;
  }
  async findAllUser(request: Empty) {
    console.log('test');
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

  async login(request: AuthRequestDto) {
    return null;
  }

  async register(request: RegisterRequestDto) {
    return null;
  }

  async forgotPassword(request: ForgotPasswordRequestDto) {
    return null;
  }
}
