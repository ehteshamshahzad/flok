import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserResponse } from './dto/login-user-response.dto';
import { LoginUserInput } from './dto/login-user.input';
import { Auth } from './entities/auth.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Query(() => LoginUserResponse, { name: 'loginUser' })
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }

}
