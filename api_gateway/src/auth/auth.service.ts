import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/constants';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  IAuthReponse,
  ICreateUserDto,
  ILoginRequestDto,
  IUser,
} from 'src/types/auth';
import { RegisterInput } from './inputs/resgister.input';
import { AuthModel } from './models/auth.model';
import { lastValueFrom } from 'rxjs';
import { LoginInput } from './inputs/login.input';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;
  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async registerUser(input: RegisterInput): Promise<AuthModel> {
    const registerUserDto: ICreateUserDto = {
      email: input.email,
      username: input.username,
      password: input.password,
    };
    const newUserResponse: IAuthReponse = await lastValueFrom(
      this.authService.register(registerUserDto),
    );
    if (newUserResponse.isError) {
      throw new Error(newUserResponse.error.errorMsg);
    }
    console.log('newUserResponse: ', newUserResponse);
    return this.mapInterfaceToAuthModel(newUserResponse.data.user);
  }

  async loginUser(input: LoginInput): Promise<AuthModel> {
    const loginUserDto: ILoginRequestDto = {
      username: input.username,
      password: input.password,
    };
    console.log('loginUserDto: ', loginUserDto);
    const loginUserResponse: IAuthReponse = await lastValueFrom(
      this.authService.login(loginUserDto),
    );
    console.log('loginUserResponse: ', loginUserResponse);
    if (loginUserResponse.isError) {
      throw new Error(loginUserResponse.error.errorMsg);
    }
    console.log('loginUserResponse: ', loginUserResponse);
    return this.mapInterfaceToAuthModel(loginUserResponse.data.user);
  }

  mapInterfaceToAuthModel = (data: IUser) => {
    return {
      createdAt: data?.createdAt || null,
      email: data?.email || '',
      username: data?.username || '',
      password: data?.password || '',
      id: data?.id || -1,
      refreshToken: data?.refreshToken || '',
    } as AuthModel;
  };
}
