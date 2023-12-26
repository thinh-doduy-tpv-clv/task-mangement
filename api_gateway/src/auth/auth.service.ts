import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AUTH_SERVICE } from 'src/constants';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  IAuthReponse,
  ICreateUserDto,
  ILoginRequestDto,
  IUser,
} from 'src/types/auth';
import { LoginInput } from './inputs/login.input';
import {
  NewResetPasswordInput,
  RequestResetPasswordInput,
} from './inputs/password-reset.input';
import { RegisterInput } from './inputs/resgister.input';
import { AuthModel } from './models/auth.model';
import { GraphQLError } from 'graphql';
import { CustomError } from 'src/utils/exceptions/custom-exception.format';
import { ERROR_CODE } from 'src/utils/constants';

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
    return this.mapInterfaceToAuthModel(newUserResponse.data.user);
  }

  async loginUser(input: LoginInput): Promise<AuthModel> {
    const loginUserDto: ILoginRequestDto = {
      username: input.username,
      password: input.password,
    };
    const loginUserResponse: IAuthReponse = await lastValueFrom(
      this.authService.login(loginUserDto),
    );
    if (loginUserResponse.isError) {
      throw new Error(loginUserResponse.error.errorMsg);
    }
    return this.mapInterfaceToAuthModel(loginUserResponse.data.user);
  }

  async requestResetPassword(
    input: RequestResetPasswordInput,
  ): Promise<AuthModel> {
    const resetRequestResponse: IAuthReponse = await lastValueFrom(
      this.authService.forgotPassword({
        email: input.email,
        username: input.username,
      }),
    );
    if (resetRequestResponse.isError) {
      throw new GraphQLError(resetRequestResponse.error.errorMsg, {
        extensions: {
          code: resetRequestResponse.error.errorCode,
          message: resetRequestResponse.error.errorMsg,
          errorCode: ERROR_CODE.USER_NOT_FOUND,
        },
        originalError: new CustomError(
          resetRequestResponse.error.errorMsg,
          resetRequestResponse.error.errorCode,
          'BAD_REQUEST',
        ),
      });
    }
    return {
      email: resetRequestResponse.data.user.email,
      password: resetRequestResponse.data.user.password,
      username: resetRequestResponse.data.user.username,
      accessToken: resetRequestResponse.data.user.accessToken,
      createdAt: resetRequestResponse.data.user.createdAt,
      id: resetRequestResponse.data.user.id,
      refreshToken: resetRequestResponse.data.user.refreshToken,
      link: resetRequestResponse.data.user.link,
    } as AuthModel;
  }

  async resetPassword(input: NewResetPasswordInput): Promise<AuthModel> {
    const resetResponse: IAuthReponse = await lastValueFrom(
      this.authService.resetPassword({
        encryptInput: input.encodedUsername,
        newPassword: input.password,
      }),
    );
    if (resetResponse.isError) {
      throw new GraphQLError(resetResponse.error.errorMsg, {
        extensions: {
          code: resetResponse.error.errorCode,
          message: resetResponse.error.errorMsg,
          errorCode: ERROR_CODE.RESET_PASSWORD_FAILED,
        },
        originalError: new CustomError(
          resetResponse.error.errorMsg,
          resetResponse.error.errorCode,
          'BAD_REQUEST',
        ),
      });
    }
    return {
      email: resetResponse.data.user.email,
      password: resetResponse.data.user.password,
      username: resetResponse.data.user.username,
      accessToken: resetResponse.data.user.accessToken,
      createdAt: resetResponse.data.user.createdAt,
      id: resetResponse.data.user.id,
      refreshToken: resetResponse.data.user.refreshToken,
      link: resetResponse.data.user.link,
    } as AuthModel;
  }

  mapInterfaceToAuthModel = (data: IUser) => {
    return {
      createdAt: data?.createdAt || null,
      email: data?.email || '',
      username: data?.username || '',
      password: data?.password || '',
      id: data?.id || -1,
      refreshToken: data?.refreshToken || '',
      accessToken: data?.accessToken || '',
    } as AuthModel;
  };
}
