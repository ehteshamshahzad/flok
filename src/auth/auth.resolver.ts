import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserResponse } from './dto/login-user-response.dto';
import { LoginUserInput } from './dto/login-user.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Query(() => LoginUserResponse, { name: 'loginUser' })
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }

}
