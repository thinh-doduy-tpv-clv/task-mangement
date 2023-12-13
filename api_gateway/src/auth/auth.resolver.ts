import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthModel } from './models/auth.model';
import { RegisterInput } from './inputs/resgister.input';
import { LoginInput } from './inputs/login.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthModel)
  async login(@Args('input') input: LoginInput): Promise<AuthModel> {
    // Call your AuthService method to handle registration logic
    const registeredUser: AuthModel = await this.authService.loginUser(input);
    // Return the registered user
    return registeredUser;
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
}
