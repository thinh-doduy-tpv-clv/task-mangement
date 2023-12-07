/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface AuthRequestDto {
  username: string;
  password: string;
}

export interface RegisterRequestDto {
  username: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequestDto {
  email: string;
}

export interface AuthResponseDto {
  token: string;
}

export interface ErrorResponseDto {
  errorMessage: string;
}

export interface UpdateUserDto {
  username: string;
  email: string;
  password: string;
  dueDate: string;
}

export interface FindOneUserDto {
  id: string;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export interface Empty {
}

export interface Users {
  users: User[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date | undefined;
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
  createUser(request: CreateUserDto): Observable<User>;

  findAllUser(request: Empty): Observable<Users>;

  findOneUser(request: FindOneUserDto): Observable<User>;

  updateUser(request: UpdateUserDto): Observable<User>;

  removeUser(request: FindOneUserDto): Observable<User>;

  login(request: AuthRequestDto): Observable<AuthResponseDto>;

  register(request: RegisterRequestDto): Observable<AuthResponseDto>;

  forgotPassword(request: ForgotPasswordRequestDto): Observable<ErrorResponseDto>;
}

export interface AuthServiceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findAllUser(request: Empty): Promise<Users> | Observable<Users> | Users;

  findOneUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;

  updateUser(request: UpdateUserDto): Promise<User> | Observable<User> | User;

  removeUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;

  login(request: AuthRequestDto): Promise<AuthResponseDto> | Observable<AuthResponseDto> | AuthResponseDto;

  register(request: RegisterRequestDto): Promise<AuthResponseDto> | Observable<AuthResponseDto> | AuthResponseDto;

  forgotPassword(
    request: ForgotPasswordRequestDto,
  ): Promise<ErrorResponseDto> | Observable<ErrorResponseDto> | ErrorResponseDto;
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
