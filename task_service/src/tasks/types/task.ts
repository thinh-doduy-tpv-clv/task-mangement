/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";

export const protobufPackage = "task";

export interface IGetTaskUserDto {
  userId: number;
}

export interface IError {
  errorCode: number;
  errorMsg: string;
}

export interface ITaskReponse {
  data: ITask[];
  error: IError | undefined;
  message: string;
  isError: boolean;
}

export interface IUpdateTaskDto {
  id: number;
  title: string;
  description: string;
  dueDate: Date | undefined;
  status: string;
  userId: number;
}

export interface IFindOneTaskDto {
  id: number;
  userId: number;
}

export interface IEmpty {
}

export interface ITasks {
  tasks: ITask[];
}

export interface ICreateTaskDto {
  title: string;
  description: string;
  dueDate: Date | undefined;
  status: string;
  userId: number;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  dueDate: Date | undefined;
  status: string;
  createdAt: Date | undefined;
  user: User | undefined;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  refreshToken: string;
  createdAt: Date | undefined;
}

export const TASK_PACKAGE_NAME = "task";

wrappers[".google.protobuf.Timestamp"] = {
  fromObject(value: Date) {
    return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
  },
  toObject(message: { seconds: number; nanos: number }) {
    return new Date(message.seconds * 1000 + message.nanos / 1e6);
  },
} as any;

export interface TasksServiceClient {
  createTask(request: ICreateTaskDto): Observable<ITaskReponse>;

  findAllTask(request: IGetTaskUserDto): Observable<ITaskReponse>;

  findOneTask(request: IFindOneTaskDto): Observable<ITaskReponse>;

  updateTask(request: IUpdateTaskDto): Observable<ITaskReponse>;

  removeTask(request: IFindOneTaskDto): Observable<ITaskReponse>;
}

export interface TasksServiceController {
  createTask(request: ICreateTaskDto): Promise<ITaskReponse> | Observable<ITaskReponse> | ITaskReponse;

  findAllTask(request: IGetTaskUserDto): Promise<ITaskReponse> | Observable<ITaskReponse> | ITaskReponse;

  findOneTask(request: IFindOneTaskDto): Promise<ITaskReponse> | Observable<ITaskReponse> | ITaskReponse;

  updateTask(request: IUpdateTaskDto): Promise<ITaskReponse> | Observable<ITaskReponse> | ITaskReponse;

  removeTask(request: IFindOneTaskDto): Promise<ITaskReponse> | Observable<ITaskReponse> | ITaskReponse;
}

export function TasksServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createTask", "findAllTask", "findOneTask", "updateTask", "removeTask"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TasksService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TasksService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TASKS_SERVICE_NAME = "TasksService";
