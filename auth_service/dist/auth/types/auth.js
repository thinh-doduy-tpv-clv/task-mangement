"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_SERVICE_NAME = exports.AuthServiceControllerMethods = exports.AUTH_PACKAGE_NAME = exports.protobufPackage = void 0;
const microservices_1 = require("@nestjs/microservices");
const protobufjs_1 = require("protobufjs");
exports.protobufPackage = "auth";
exports.AUTH_PACKAGE_NAME = "auth";
protobufjs_1.wrappers[".google.protobuf.Timestamp"] = {
    fromObject(value) {
        return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
    },
    toObject(message) {
        return new Date(message.seconds * 1000 + message.nanos / 1e6);
    },
};
function AuthServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = [
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
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)("AuthService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("AuthService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.AuthServiceControllerMethods = AuthServiceControllerMethods;
exports.AUTH_SERVICE_NAME = "AuthService";
//# sourceMappingURL=auth.js.map