import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserResponse } from './dto/login-user-response.dto';
import { LoginUserInput } from './dto/login-user.input';
import { RegisterUserResponseDto } from './dto/register-user-response.dto';
import { RegisterUserInput } from './dto/register-user.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginUserResponse, { name: 'loginUser' })
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => RegisterUserResponseDto, { name: 'registerUser' })
  registerUser(
    @Args('registerUserInput') registerUserInput: RegisterUserInput
  ) {
    return this.authService.register(registerUserInput);
  }
}
