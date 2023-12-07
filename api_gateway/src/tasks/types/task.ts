/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";

export const protobufPackage = "task";

export interface UpdateTaskDto {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

export interface FindOneTaskDto {
  id: string;
}

export interface Empty {
}

export interface Tasks {
  tasks: Task[];
}

export interface CreateTaskDto {
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
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
  createTask(request: CreateTaskDto): Observable<Task>;

  findAllTask(request: Empty): Observable<Tasks>;

  findOneTask(request: FindOneTaskDto): Observable<Task>;

  updateTask(request: UpdateTaskDto): Observable<Task>;

  removeTask(request: FindOneTaskDto): Observable<Task>;
}

export interface TasksServiceController {
  createTask(request: CreateTaskDto): Promise<Task> | Observable<Task> | Task;

  findAllTask(request: Empty): Promise<Tasks> | Observable<Tasks> | Tasks;

  findOneTask(request: FindOneTaskDto): Promise<Task> | Observable<Task> | Task;

  updateTask(request: UpdateTaskDto): Promise<Task> | Observable<Task> | Task;

  removeTask(request: FindOneTaskDto): Promise<Task> | Observable<Task> | Task;
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
