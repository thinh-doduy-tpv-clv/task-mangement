"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASKS_SERVICE_NAME = exports.TasksServiceControllerMethods = exports.TASK_PACKAGE_NAME = exports.protobufPackage = void 0;
const microservices_1 = require("@nestjs/microservices");
const protobufjs_1 = require("protobufjs");
exports.protobufPackage = "task";
exports.TASK_PACKAGE_NAME = "task";
protobufjs_1.wrappers[".google.protobuf.Timestamp"] = {
    fromObject(value) {
        return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
    },
    toObject(message) {
        return new Date(message.seconds * 1000 + message.nanos / 1e6);
    },
};
function TasksServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = ["createTask", "findAllTask", "findOneTask", "updateTask", "removeTask"];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)("TasksService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("TasksService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.TasksServiceControllerMethods = TasksServiceControllerMethods;
exports.TASKS_SERVICE_NAME = "TasksService";
//# sourceMappingURL=task.js.map