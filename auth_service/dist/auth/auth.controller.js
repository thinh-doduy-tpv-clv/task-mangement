"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_1 = require("./types/auth");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async createUser(request) {
        return null;
    }
    async findAllUser(request) {
        console.log('test');
        return null;
    }
    async findOneUser(request) {
        return null;
    }
    async updateUser(request) {
        return null;
    }
    async removeUser(request) {
        return null;
    }
    async login(request) {
        return null;
    }
    async register(request) {
        return null;
    }
    async forgotPassword(request) {
        return null;
    }
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, auth_1.AuthServiceControllerMethods)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map