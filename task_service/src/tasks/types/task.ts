/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";

export const protobufPackage = "task";

export interface IError {
  errorCode: number;
  errorMsg: string;
}

export interface IData {
  tasks?: ITasks | undefined;
  task?: ITask | undefined;
}

export interface ITaskReponse {
  data: IData | undefined;
  error: IError | undefined;
  isError: boolean;
}

export interface IUpdateTaskDto {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

export interface IFindOneTaskDto {
  id: number;
}

export interface IEmpty {
}

export interface ITasks {
  tasks: ITask[];
}

export interface ICreateTaskDto {
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  dueDate: Date | undefined;
  status: string;
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

  findAllTask(request: IEmpty): Observable<ITaskReponse>;

  findOneTask(request: IFindOneTaskDto): Observable<ITaskReponse>;

  updateTask(request: IUpdateTaskDto): Observable<ITaskReponse>;

  removeTask(request: IFindOneTaskDto): Observable<ITaskReponse>;
}

export interface TasksServiceController {
  createTask(request: ICreateTaskDto): Promise<ITaskReponse> | Observable<ITaskReponse> | ITaskReponse;

  findAllTask(request: IEmpty): Promise<ITaskReponse> | Observable<ITaskReponse> | ITaskReponse;

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
