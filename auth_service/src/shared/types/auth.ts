/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface IAuthReponse {
  data: IData | undefined;
  error: IError | undefined;
  isError: boolean;
}

export interface IError {
  errorCode: number;
  errorMsg: string;
}

export interface IData {
  loginResponse?: ILoginResponseDto | undefined;
  registerResponse?: IRegisterResponseDto | undefined;
  user?: IUser | undefined;
}

export interface IRefreshTokenRequestDto {
  refreshToken: string;
}

export interface ILoginRequestDto {
  username: string;
  password: string;
}

export interface IRegisterRequestDto {
  username: string;
  email: string;
  password: string;
}

export interface IForgotPasswordRequestDto {
  email: string;
}

export interface IRegisterResponseDto {
  username: string;
  email: string;
}

export interface ILoginResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface IErrorResponseDto {
  errorMessage: string;
}

export interface IUpdateUserDto {
  id: string;
  username: string;
  email: string;
  password: string;
  dueDate: string;
}

export interface IFindOneUserDto {
  id: string;
}

export interface ICreateUserDto {
  username: string;
  email: string;
  password: string;
}

export interface IEmpty {
}

export interface IUsers {
  users: IUser[];
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  refreshToken: string;
  createdAt: Date | undefined;
  accessToken?: string | undefined;
}

export const AUTH_PACKAGE_NAME = "auth";

wrappers[".google.protobuf.Timestamp"] = {
  fromObject(value: Date) {
    return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
  },
  toObject(message: { seconds: number; nanos: number }) {
    return new Date(message.seconds * 1000 + message.nanos / 1e6);
  },
} as any;

export interface AuthServiceClient {
  createUser(request: ICreateUserDto): Observable<IUser>;

  findAllUser(request: IEmpty): Observable<IUsers>;

  findOneUser(request: IFindOneUserDto): Observable<IAuthReponse>;

  updateUser(request: IUpdateUserDto): Observable<IAuthReponse>;

  removeUser(request: IFindOneUserDto): Observable<IUser>;

  login(request: ILoginRequestDto): Observable<IAuthReponse>;

  register(request: IRegisterRequestDto): Observable<IAuthReponse>;

  forgotPassword(request: IForgotPasswordRequestDto): Observable<IAuthReponse>;

  refreshToken(request: IRefreshTokenRequestDto): Observable<IAuthReponse>;
}

export interface AuthServiceController {
  createUser(request: ICreateUserDto): Promise<IUser> | Observable<IUser> | IUser;

  findAllUser(request: IEmpty): Promise<IUsers> | Observable<IUsers> | IUsers;

  findOneUser(request: IFindOneUserDto): Promise<IAuthReponse> | Observable<IAuthReponse> | IAuthReponse;

  updateUser(request: IUpdateUserDto): Promise<IAuthReponse> | Observable<IAuthReponse> | IAuthReponse;

  removeUser(request: IFindOneUserDto): Promise<IUser> | Observable<IUser> | IUser;

  login(request: ILoginRequestDto): Promise<IAuthReponse> | Observable<IAuthReponse> | IAuthReponse;

  register(request: IRegisterRequestDto): Promise<IAuthReponse> | Observable<IAuthReponse> | IAuthReponse;

  forgotPassword(request: IForgotPasswordRequestDto): Promise<IAuthReponse> | Observable<IAuthReponse> | IAuthReponse;

  refreshToken(request: IRefreshTokenRequestDto): Promise<IAuthReponse> | Observable<IAuthReponse> | IAuthReponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createUser",
      "findAllUser",
      "findOneUser",
      "updateUser",
      "removeUser",
      "login",
      "register",
      "forgotPassword",
      "refreshToken",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
