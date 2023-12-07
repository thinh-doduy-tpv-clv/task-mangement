import { CreateUserDto, Empty, FindOneUserDto, UpdateUserDto, AuthServiceController, AuthRequestDto, RegisterRequestDto, ForgotPasswordRequestDto } from './types/auth';
import { AuthService } from './auth.service';
export declare class AuthController implements AuthServiceController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(request: CreateUserDto): Promise<any>;
    findAllUser(request: Empty): Promise<any>;
    findOneUser(request: FindOneUserDto): Promise<any>;
    updateUser(request: UpdateUserDto): Promise<any>;
    removeUser(request: FindOneUserDto): Promise<any>;
    login(request: AuthRequestDto): Promise<any>;
    register(request: RegisterRequestDto): Promise<any>;
    forgotPassword(request: ForgotPasswordRequestDto): Promise<any>;
}
