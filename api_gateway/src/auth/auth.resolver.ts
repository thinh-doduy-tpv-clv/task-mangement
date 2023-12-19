import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './inputs/login.input';
import {
  NewResetPasswordInput,
  RequestResetPasswordInput,
} from './inputs/password-reset.input';
import { RegisterInput } from './inputs/resgister.input';
import { AuthModel } from './models/auth.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthModel)
  async login(@Args('input') input: LoginInput): Promise<AuthModel> {
    // Call your AuthService method to handle registration logic
    const loginUser: AuthModel = await this.authService.loginUser(input);
    // Return the registered user
    return loginUser;
  }

  @Mutation(() => AuthModel)
  async register(@Args('input') input: RegisterInput): Promise<AuthModel> {
    // Call your AuthService method to handle registration logic
    const registeredUser: AuthModel = await this.authService.registerUser(
      input,
    );
    // Return the registered user
    return registeredUser;
  }

  @Mutation(() => AuthModel)
  async requestResetPassword(
    @Args('input') input: RequestResetPasswordInput,
  ): Promise<AuthModel> {
    // Call your AuthService method to handle registration logic
    const requestResetResponse: AuthModel =
      await this.authService.requestResetPassword(input);
    // Return the registered user
    return requestResetResponse;
  }

  @Mutation(() => AuthModel)
  async resetPassword(
    @Args('input') input: NewResetPasswordInput,
  ): Promise<AuthModel> {
    // Call your AuthService method to handle registration logic
    const requestResetResponse: AuthModel =
      await this.authService.resetPassword(input);
    // Return the registered user
    return requestResetResponse;
  }
}
