import { UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';
import { RegisterUserResponseDto } from 'src/users/dto/register-user-response.dto';
import { RegisterUserInput } from 'src/users/dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Mutation(() => RegisterUserResponseDto)
  registerUser(@Args('registerUserInput') registerUserInput: RegisterUserInput) {
    return this.usersService.register(registerUserInput);
  }

  // TODO: Close this API. Or make it admin only
  @Query(() => [User], { name: 'users' })
  @UseGuards(AccessTokenGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.usersService.findOne(id);
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
