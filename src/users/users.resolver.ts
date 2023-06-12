import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { RegisterUserResponseDto } from 'src/users/dto/register-user-response.dto';
import { RegisterUserInput } from 'src/users/dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  // TODO: Close this API. Or make it admin only
  // @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Mutation(() => RegisterUserResponseDto)
  registerUser(@Args('registerUserInput') registerUserInput: RegisterUserInput) {
    return this.usersService.register(registerUserInput);
  }

  // @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  async findOne(@CurrentUser() user: User) {
    return await this.usersService.findOne(user.id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
