/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "biz";

export interface RequestTaskDto {
  task: string;
  status: string;
  key: string;
}

export const BIZ_PACKAGE_NAME = "biz";

export interface BizServiceClient {
  sendAmount(request: RequestTaskDto): Observable<Empty>;
}

export interface BizServiceController {
  sendAmount(request: RequestTaskDto): void;
}

export function BizServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sendAmount"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BizService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BizService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BIZ_SERVICE_NAME = "BizService";
