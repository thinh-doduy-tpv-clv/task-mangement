/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "biz";

export interface SendDto {
  amount: number;
}

export interface MyData {
  data: string;
}

export const BIZ_PACKAGE_NAME = "biz";

export interface BizServiceClient {
  sendAmount(request: SendDto): Observable<MyData>;
}

export interface BizServiceController {
  sendAmount(request: SendDto): Promise<MyData> | Observable<MyData> | MyData | Promise<void>;
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
