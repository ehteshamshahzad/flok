import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDto } from './dto/user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  // TODO: Close this API. Or make it admin only
  // @UseGuards(GqlAuthGuard)
  // @Query(() => [UserDto], { nullable: true, name: 'users' })
  // async findAll() {
  //   return await this.usersService.findAll();
  // }

  // @UseGuards(GqlAuthGuard)
  // @Query(() => UserDto, { name: 'user' })
  // async findOne(@CurrentUser() user: User) {
  //   return await this.usersService.findOne(user.id);
  // }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserDto, { name: 'currentUser' })
  async findCurrentUser(@CurrentUser() user: User) {
    return await this.usersService.findOne(user.id);
  }

  @Mutation(() => [User], { nullable: true, name: 'seedUsers' })
  seedUsers() {
    return this.usersService.seed();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserDto, { name: 'updateUser' })
  async updateUser(@CurrentUser() user: User, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.usersService.updateUser(user.id, updateUserInput);
  }

}
